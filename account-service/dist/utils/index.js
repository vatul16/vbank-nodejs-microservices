"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccountNumber = exports.createError = void 0;
const nanoid_1 = require("nanoid");
const account_entity_1 = require("../entity/account.entity");
const createError = (message, statusCode, errorCode) => {
    return Object.assign(new Error(message), { statusCode, errorCode });
};
exports.createError = createError;
const accountTypeMap = {
    [account_entity_1.AccountType.SAVINGS]: "11",
    [account_entity_1.AccountType.CURRENT]: "13",
};
// returns 15 digit account number
const generateAccountNumber = (accountType, idLength = 7) => {
    const date = new Date().toISOString().slice(0, 4).replace(/-/g, "");
    const uniqueId = (0, nanoid_1.customAlphabet)("0123456789", idLength)();
    return `${accountTypeMap[accountType]}${date}${accountTypeMap[accountType]}${uniqueId}`;
};
exports.generateAccountNumber = generateAccountNumber;
