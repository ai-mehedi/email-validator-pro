"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidFormat = isValidFormat;
function isValidFormat(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
