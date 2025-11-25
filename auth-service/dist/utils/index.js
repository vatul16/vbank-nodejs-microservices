"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
const createError = (message, statusCode) => {
    return Object.assign(new Error(message), { statusCode });
};
exports.createError = createError;
