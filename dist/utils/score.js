"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQualityScore = getQualityScore;
function getQualityScore(options) {
    let score = 100;
    // Invalid format is a hard fail
    if (!options.formatValid)
        return 0;
    // MX record is critical
    if (!options.hasMX)
        score -= 40;
    // SMTP check failure is also significant
    if (!options.smtpCheckResult)
        score -= 30;
    // Disposable emails are very low quality
    if (options.disposable)
        score -= 20;
    // Generic role-based addresses (e.g., admin@, info@)
    if (options.generic)
        score -= 10;
    // Catch-all domains are less predictable
    if (options.catchAll)
        score -= 5;
    // Ensure score doesn't go below 0
    return Math.max(0, score);
}
