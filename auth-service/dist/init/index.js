"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafka_1 = require("../events/kafka");
exports.default = async () => {
    await (0, kafka_1.connectKafka)();
};
