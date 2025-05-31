import { isValidFormat } from "./utils/format";
import { hasMXRecord, getMxHost } from "./utils/mx";
import { isDisposable } from "./utils/disposable";
import { isGeneric } from "./utils/generic";
import { isFreeProvider } from "./utils/freeProvider";
import { getProvider } from "./utils/provider";
import { getQualityScore } from "./utils/score";
import { checkSMTP } from "./utils/smtp"; // ✅

type ValidateOptions = {
  email: string;
  fromEmail: string;        // sender address for SMTP check
  smtpCheck?: boolean;      // default false
  debug?: boolean;          // optional SMTP debug
};

export async function validateEmail({
  email,
  fromEmail,
  smtpCheck = false,
  debug = false,
}: ValidateOptions) {
  const [username, domain] = email.toLowerCase().split("@");
  const formatValid = isValidFormat(email);
  const hasMX = await hasMXRecord(domain);
  const disposable = await isDisposable(email);
  const generic = isGeneric(username);
  const free = isFreeProvider(domain);
  const provider = getProvider(domain);
  const mxHost = await getMxHost(domain);

  // Run SMTP check conditionally
  let smtpResult = {
    smtpSuccess: false,
    message: "SMTP check skipped",
    catchAll: false,
  };

  if (smtpCheck && hasMX) {
    smtpResult = await checkSMTP(email, debug, fromEmail);
  }

  // Quality Score
  const qualityScore = getQualityScore({
    formatValid,
    hasMX,
    disposable,
    generic,
    catchAll: smtpResult.catchAll ?? false,
    smtpCheckResult: smtpResult.smtpSuccess,
  });

  return {
    email,
    username,
    domain,
    formatValid,
    hasMX,
    isDisposable: disposable,
    isGeneric: generic,
    isFree: free,
    provider,
    mxRecord: mxHost,
    canReceiveEmail: smtpResult, // full object with smtpSuccess, message, etc.
    qualityScore,
  };
}
