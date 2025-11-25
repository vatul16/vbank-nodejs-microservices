"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const logger_1 = __importDefault(require("../config/logger"));
const http_status_codes_1 = require("http-status-codes");
const errorHandler = (error, req, res, next) => {
    logger_1.default.error(error);
    if (error instanceof zod_1.z.ZodError) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            status: "error",
            message: "Invalid input",
            errors: error.errors,
        });
        return;
    }
    const statusCode = error.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal server error";
    const status = error.status || "error";
    if (process.env.NODE_ENV !== "production") {
        logger_1.default.error({
            message,
            stack: error.stack,
            path: req.path,
            method: req.method,
            body: req.body,
            query: req.query,
        });
    }
    res.status(statusCode).json({
        status,
        message,
    });
};
exports.errorHandler = errorHandler;
