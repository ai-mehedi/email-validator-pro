"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestDomain = suggestDomain;
const didyoumean2_1 = __importDefault(require("didyoumean2"));
const COMMON_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
function suggestDomain(domain) {
    return (0, didyoumean2_1.default)(domain, COMMON_DOMAINS);
}
