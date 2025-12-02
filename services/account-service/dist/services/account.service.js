"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountService = exports.AccountService = void 0;
const data_source_1 = require("../data-source");
const account_entity_1 = require("../entity/account.entity");
class AccountService {
    accountRepository;
    constructor() {
        this.accountRepository = data_source_1.AppDataSource.getRepository(account_entity_1.Account);
    }
    async list(userId) {
        const accounts = await this.accountRepository.find({
            where: { userId },
        });
        return accounts;
    }
}
exports.AccountService = AccountService;
exports.accountService = new AccountService();
