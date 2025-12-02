"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectKafka = exports.connectKafka = exports.producer = void 0;
const kafkajs_1 = require("kafkajs");
const config_1 = require("../config");
const logger_1 = __importDefault(require("../config/logger"));
const kafka = new kafkajs_1.Kafka({
    clientId: config_1.config.SERVICE_NAME,
    brokers: [config_1.config.KAFKA_BROKER],
});
exports.producer = kafka.producer({
    allowAutoTopicCreation: true,
    createPartitioner: kafkajs_1.Partitioners.DefaultPartitioner,
});
const connectKafka = async () => {
    try {
        await exports.producer.connect();
        logger_1.default.info("Kafka producer connected");
    }
    catch (error) {
        logger_1.default.error("Failed to connect Kafka producer/consumer", error);
        throw error;
    }
};
exports.connectKafka = connectKafka;
const disconnectKafka = async () => {
    try {
        await exports.producer.disconnect();
        logger_1.default.info("Kafka producer disconnected");
    }
    catch (error) {
        logger_1.default.error("Failed to disconnect Kafka producer", error);
    }
};
exports.disconnectKafka = disconnectKafka;
