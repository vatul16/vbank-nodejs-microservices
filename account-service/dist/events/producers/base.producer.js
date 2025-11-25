"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseProducer = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
const kafka_1 = require("../kafka");
class BaseProducer {
    async publish(data) {
        try {
            logger_1.default.info(`publishing message to kafka: ${this.topic} with message: ${JSON.stringify(data)}`);
            await kafka_1.producer.send({
                topic: this.topic,
                messages: [
                    {
                        key: data.key,
                        value: JSON.stringify(data.value),
                    },
                ],
            });
            logger_1.default.debug(`message published successfully to topic: ${this.topic}`);
        }
        catch (error) {
            logger_1.default.error(`failed to publish message to topic ${this.topic}: ${error}`);
            throw error;
        }
    }
}
exports.BaseProducer = BaseProducer;
