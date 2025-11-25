"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishAccountDeleted = exports.AccountDeletedProducer = void 0;
const constants_1 = require("../../constants");
const base_producer_1 = require("./base.producer");
class AccountDeletedProducer extends base_producer_1.BaseProducer {
    topic = constants_1.USER_TOPICS.ACCOUNT_DELETED;
}
exports.AccountDeletedProducer = AccountDeletedProducer;
const accountDeletedProducer = new AccountDeletedProducer();
const publishAccountDeleted = async (data) => accountDeletedProducer.publish(data);
exports.publishAccountDeleted = publishAccountDeleted;
