"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDisposable = isDisposable;
const DISIFY_API = "https://www.disify.com/api/email";
const axios_1 = __importDefault(require("axios"));
async function isDisposable(email) {
    try {
        const res = await axios_1.default.get(`${DISIFY_API}/${email}`);
        if (res.data.disposable === true) {
            return true;
        }
        return false;
    }
    catch (err) {
        console.error("Error calling Disify API:", err);
    }
    return false;
}
