"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGracefulShutdown = void 0;
const data_source_1 = require("../data-source");
const logger_1 = __importDefault(require("../config/logger"));
const redis_1 = require("../config/redis");
const setupGracefulShutdown = (server) => {
    const shutdown = async (signal) => {
        logger_1.default.info(`Received ${signal}. Starting graceful shutdown...`);
        try {
            await new Promise((resolve) => {
                server.close(() => {
                    logger_1.default.info("Server closed");
                    resolve();
                });
            });
            if (data_source_1.AppDataSource.isInitialized) {
                await data_source_1.AppDataSource.destroy();
                logger_1.default.info("Database connection closed");
            }
            await redis_1.RedisClient.closeConnection();
            logger_1.default.info("Gracefull shutdown complete\n---------------------------------");
            process.exit(0);
        }
        catch (error) {
            logger_1.default.error("Error during shutdown: ", error);
            process.exit(1);
        }
    };
    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("uncaughtException", (error) => {
        logger_1.default.error("Uncaught Exception: ", error);
        shutdown("uncaughtException");
    });
    process.on("unhandledRejection", (reason, promise) => {
        logger_1.default.error("Unhandled Rejection at: ", promise, "reason:", reason);
        shutdown("unhandledRejection");
    });
};
exports.setupGracefulShutdown = setupGracefulShutdown;
