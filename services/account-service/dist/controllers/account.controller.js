"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
class AccountController {
    accountService;
    constructor(accountService) {
        this.accountService = accountService;
    }
    async list(req, res) {
        const accounts = await this.accountService.list(req.userId);
        return res.status(200).json(accounts);
    }
}
exports.AccountController = AccountController;
