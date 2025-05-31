"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGeneric = isGeneric;
const GENERIC_USERNAMES = ['info', 'admin', 'contact', 'sales', 'support'];
function isGeneric(username) {
    return GENERIC_USERNAMES.includes(username);
}
