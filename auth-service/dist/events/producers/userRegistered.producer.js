"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishUserRegistered = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
const constants_1 = require("../../constants");
const kafka_1 = require("../kafka");
const publishUserRegistered = async (data) => {
    const topic = constants_1.USER_TOPICS.USER_REGISTERED;
    logger_1.default.info(`publishing message to topic: ${topic} with message: ${JSON.stringify(data)}`);
    await kafka_1.producer.send({
        topic,
        messages: [
            {
                key: data.key,
                value: JSON.stringify(data.value),
            },
        ],
    });
};
exports.publishUserRegistered = publishUserRegistered;
