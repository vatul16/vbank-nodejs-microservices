"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    SERVICE_NAME: require("../../package.json").name,
    PORT: Number(process.env.PORT) || 3001,
    DATABASE_URL: process.env.DATABASE_URL || "postgres://user:password@localhost:5432/auth",
    REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
    KAFKA_BROKER: process.env.KAFKA_BROKER || "localhost:9092",
    JWT_SECRET: process.env.JWT_SECRET || "your-default-secret-key",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "24h",
    LOG_LEVEL: process.env.LOG_LEVEL || "info",
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "http://localhost:3000",
};
