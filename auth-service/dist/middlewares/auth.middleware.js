"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const http_status_codes_1 = require("http-status-codes");
const redis_1 = __importDefault(require("../config/redis"));
const publicRoutes = ["/api/v1/auth/register", "/api/v1/auth/login"];
const verifyToken = (req, res, next) => {
    if (publicRoutes.includes(req.path)) {
        return next();
    }
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res
            .status(http_status_codes_1.StatusCodes.FORBIDDEN)
            .json({ message: "invalid authorization header", path: req.path });
    }
    jsonwebtoken_1.default.verify(token, config_1.config.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .send({ message: "unauthorized" });
        }
        const redisKey = `auth:${decoded.id}:${token}`;
        const redisToken = await redis_1.default.get(redisKey);
        if (!redisToken) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ message: "unauthorized" });
        }
        req.userId = decoded.id;
        req.token = token;
        return next();
    });
};
exports.verifyToken = verifyToken;
