"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqLogger = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const reqLogger = (req, res, next) => {
    logger_1.default.debug(`[${req.method}] ${req.originalUrl}`);
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        logger_1.default.info(`[${req.method}] ${req.originalUrl} - status: ${res.statusCode} - ${duration}ms`);
    });
    next();
};
exports.reqLogger = reqLogger;
