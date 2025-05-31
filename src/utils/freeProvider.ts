
export const FREE_PROVIDERS = [
  'gmail.com',         // Google Mail
  'yahoo.com',         // Yahoo Mail
  'hotmail.com',       // Microsoft legacy
  'outlook.com',       // Microsoft Outlook
  'aol.com',           // AOL Mail
  'icloud.com',        // Apple iCloud Mail
  'protonmail.com',    // Proton Mail
  'zoho.com',          // Zoho Mail
  'mail.com',          // Mail.com (GMX)
  'yandex.com',        // Yandex Mail

  'gmx.com',           // GMX Mail
  'tutanota.com',      // Tutanota encrypted mail
  'inbox.com',         // Inbox Mail
  'live.com',          // Microsoft Live Mail
  'msn.com',           // Microsoft MSN Mail
  'rediffmail.com',    // India-based provider
  'rocketmail.com',    // Legacy Yahoo Mail
  'fastmail.com',      // FastMail
  'mailfence.com',     // Secure email
  'seznam.cz',         // Czech provider

  'hushmail.com',      // Secure email
  'qq.com',            // China (Tencent)
  '126.com',           // China
  '163.com',           // China
  'naver.com',         // South Korea
  'daum.net',          // South Korea
  'web.de',            // Germany
  'freemail.hu',       // Hungary
  'mail.ru',           // Russia
  'libero.it',         // Italy

  'email.it',          // Italy
  'orange.fr',         // France
  'bluewin.ch',        // Switzerland
  'laposte.net',       // France
  'shaw.ca',           // Canada
  'btinternet.com',    // UK
  'bellsouth.net',     // US (AT&T)
  'comcast.net',       // US ISP email
  'cox.net',           // US ISP email
  'sbcglobal.net',     // US ISP (AT&T)

  'verizon.net',       // US (Verizon)
  'optonline.net',     // US ISP
  'charter.net',       // US ISP
  'att.net',           // US (AT&T)
  'ntlworld.com',      // UK
  'talktalk.net',      // UK
  'virginmedia.com',   // UK
  'sky.com',           // UK
  'tiscali.it',        // Italy
  'telus.net'          // Canada
];

export function isFreeProvider(domain: string): boolean {
  return FREE_PROVIDERS.includes(domain);
}