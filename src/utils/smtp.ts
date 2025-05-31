import net from 'net'
import dns from 'dns/promises'

export const ErrorCodes = {
  211: 'System status or help reply',
  214: 'Help message',
  220: 'Server ready',
  221: 'Server closing transmission channel',
  250: 'Requested mail action okay, completed',
  251: 'User not local; will forward',
  354: 'Start mail input; end with <CRLF>.<CRLF>',
  421: 'Service not available, closing transmission channel',
  450: 'Mailbox unavailable (busy)',
  451: 'Local error in processing',
  452: 'Insufficient system storage',
  500: 'Syntax error, command unrecognized',
  501: 'Syntax error in parameters or arguments',
  502: 'Command not implemented',
  503: 'Bad sequence of commands',
  504: 'Command parameter not implemented',
  550: 'Mailbox unavailable',
  551: 'User not local; please try <forward-path>',
  552: 'Exceeded storage allocation',
  553: 'Mailbox name not allowed',
  554: 'Transaction failed',
} as const

type SMTPCode = keyof typeof ErrorCodes

const hasCode = (message: string, code: SMTPCode): boolean =>
  message.startsWith(`${code}`) || message.includes(`${code}\n`)

const createOutput = (
  smtpSuccess: boolean,
  message: string,
  inboxExists: boolean = false,
  catchAll: boolean = false
) => ({
  smtpSuccess,
  inboxExists,
  catchAll,
  message,
})

export async function checkSMTP(
  recipient: string,
  debug: boolean = false,
  sender: string
): Promise<ReturnType<typeof createOutput>> {
  const domain = recipient.split('@')[1]
  if (!domain) {
    return createOutput(false, 'Invalid recipient email address')
  }

  let mxHost: string
  try {
    const mxRecords = await dns.resolveMx(domain)
    if (!mxRecords || mxRecords.length === 0) {
      return createOutput(false, `No MX records found for ${domain}`)
    }
    mxHost = mxRecords.sort((a, b) => a.priority - b.priority)[0].exchange
  } catch (err) {
    return createOutput(false, `DNS lookup failed for domain ${domain}`)
  }

  const timeout = 10000
  const testInbox = `random_${Date.now()}@${domain}`

  return new Promise((resolve) => {
    let step = 0
    let inboxValid = false
    let randomValid = false
    let state = 'init'
    const socket = net.createConnection(25, mxHost)
    socket.setEncoding('ascii')
    socket.setTimeout(timeout)

    const commands = [
      `HELO ${mxHost}\r\n`,
      `MAIL FROM:<${sender}>\r\n`,
      `RCPT TO:<${recipient}>\r\n`,
      `RCPT TO:<${testInbox}>\r\n`, // random email to detect catch-all
    ]

    const closeConnection = (
      message: string,
      success = false,
      inbox = false,
      catchall = false
    ) => {
      if (socket.writable) socket.write('QUIT\r\n')
      socket.end()
      resolve(createOutput(success, message, inbox, catchall))
    }

    socket.on('timeout', () => {
      closeConnection('Connection timed out')
    })

    socket.on('error', (err) => {
      closeConnection(`Connection error: ${err.message}`)
    })

    socket.on('data', (msg: string) => {

      if (state === 'init' && hasCode(msg, 220)) {
        socket.write(commands[step++])
        state = 'helo'
      } else if ((state === 'helo' || state === 'mail') && hasCode(msg, 250)) {
        socket.write(commands[step++])
        state = state === 'helo' ? 'mail' : 'rcpt'
      } else if (state === 'rcpt') {
        if (hasCode(msg, 250)) {
          inboxValid = true
          socket.write(commands[step++])
          state = 'catch'
        } else if (hasCode(msg, 550)) {
          closeConnection('Inbox not found (550)', false, false, false)
        } else {
          closeConnection('Failed at RCPT TO step', false)
        }
      } else if (state === 'catch') {
        if (hasCode(msg, 250)) {
          randomValid = true
        }
        const catchAllDetected = inboxValid && randomValid
        const resultMsg = catchAllDetected
          ? 'Catch-all domain detected'
          : inboxValid
            ? 'Valid inbox (no catch-all)'
            : 'Invalid inbox'
        closeConnection(resultMsg, inboxValid, inboxValid, catchAllDetected)
      } else {
        const code = (Object.keys(ErrorCodes) as unknown as SMTPCode[]).find((c) =>
          hasCode(msg, c)
        )
        closeConnection(code ? ErrorCodes[code] : 'Unrecognized SMTP response', false)
      }
    })
  })
}
