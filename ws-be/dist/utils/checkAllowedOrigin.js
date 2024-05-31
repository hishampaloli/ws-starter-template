"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.originIsAllowed = void 0;
const originIsAllowed = (origin) => {
    console.log(process.env.ALLOWED_ORIGINS, origin);
    return process.env.ALLOWED_ORIGINS === origin;
};
exports.originIsAllowed = originIsAllowed;
