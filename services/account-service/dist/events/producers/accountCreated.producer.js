"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishAccountCreated = exports.AccountCreatedProducer = void 0;
const constants_1 = require("../../constants");
const base_producer_1 = require("./base.producer");
class AccountCreatedProducer extends base_producer_1.BaseProducer {
    topic = constants_1.USER_TOPICS.ACCOUNT_CREATED;
}
exports.AccountCreatedProducer = AccountCreatedProducer;
const accountCreatedProducer = new AccountCreatedProducer();
const publishAccountCreated = async (data) => accountCreatedProducer.publish(data);
exports.publishAccountCreated = publishAccountCreated;
