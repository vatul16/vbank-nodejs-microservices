"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const _1 = require(".");
const logger_1 = __importDefault(require("./logger"));
class RedisClient {
    static instance;
    static isConnected = false;
    constructor() { }
    static getInstance() {
        if (!RedisClient.instance) {
            RedisClient.instance = new ioredis_1.default(_1.config.REDIS_URL, {
                retryStrategy: (times) => {
                    const delay = Math.min(times * 50, 2000);
                    return delay;
                },
                maxRetriesPerRequest: 3,
            });
            RedisClient.setupEventListeners();
        }
        return RedisClient.instance;
    }
    static setupEventListeners() {
        RedisClient.instance.on("connect", () => {
            RedisClient.isConnected = true;
            logger_1.default.info("Connected to Redis");
        });
        RedisClient.instance.on("error", (error) => {
            RedisClient.isConnected = false;
            logger_1.default.error("Redis connection error: ", error);
        });
        RedisClient.instance.on("close", () => {
            RedisClient.isConnected = false;
            logger_1.default.error("Redis connection close");
        });
        RedisClient.instance.on("reconnecting", () => {
            logger_1.default.error("Reconnecting to Redis...");
        });
    }
    static async closeConnection() {
        if (RedisClient.instance) {
            try {
                await RedisClient.instance.quit();
                logger_1.default.info("Redis connection closed");
            }
            catch (error) {
                logger_1.default.error("Error closing Redis connection: ", error);
            }
        }
    }
    static isReady() {
        return RedisClient.isConnected;
    }
    static async testConnection() {
        try {
            await RedisClient.instance.ping();
            return true;
        }
        catch (error) {
            logger_1.default.error("Redis connection test failed: ", error);
            return false;
        }
    }
}
exports.RedisClient = RedisClient;
exports.default = RedisClient.getInstance();
