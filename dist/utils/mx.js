"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMXRecord = hasMXRecord;
exports.getMxHost = getMxHost;
const promises_1 = require("dns/promises");
async function hasMXRecord(domain) {
    try {
        const records = await (0, promises_1.resolveMx)(domain);
        return records && records.length > 0;
    }
    catch {
        return false;
    }
}
async function getMxHost(domain) {
    try {
        const records = await (0, promises_1.resolveMx)(domain);
        return records.sort((a, b) => a.priority - b.priority)[0].exchange;
    }
    catch {
        return null;
    }
}
