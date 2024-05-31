"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = void 0;
const fs_1 = __importDefault(require("fs"));
const errorLogger = (error) => {
    const errorMessage = `WebSocket error: ${error.message}\n`;
    console.error(errorMessage);
    fs_1.default.appendFile('error.log', errorMessage, (err) => {
        if (err)
            console.error('Failed to write to log file:', err);
    });
};
exports.errorLogger = errorLogger;
