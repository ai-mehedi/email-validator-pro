"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = validateEmail;
const format_1 = require("./utils/format");
const mx_1 = require("./utils/mx");
const disposable_1 = require("./utils/disposable");
const generic_1 = require("./utils/generic");
const freeProvider_1 = require("./utils/freeProvider");
const provider_1 = require("./utils/provider");
const score_1 = require("./utils/score");
const smtp_1 = require("./utils/smtp"); // ✅
async function validateEmail({ email, fromEmail, smtpCheck = false, debug = false, }) {
    const [username, domain] = email.toLowerCase().split("@");
    const formatValid = (0, format_1.isValidFormat)(email);
    const hasMX = await (0, mx_1.hasMXRecord)(domain);
    const disposable = await (0, disposable_1.isDisposable)(email);
    const generic = (0, generic_1.isGeneric)(username);
    const free = (0, freeProvider_1.isFreeProvider)(domain);
    const provider = (0, provider_1.getProvider)(domain);
    const mxHost = await (0, mx_1.getMxHost)(domain);
    // Run SMTP check conditionally
    let smtpResult = {
        smtpSuccess: false,
        message: "SMTP check skipped",
        catchAll: false,
    };
    if (smtpCheck && hasMX) {
        smtpResult = await (0, smtp_1.checkSMTP)(email, debug, fromEmail);
    }
    // Quality Score
    const qualityScore = (0, score_1.getQualityScore)({
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
