import { Request, Response } from "express";
import { z } from "zod";

import { AccountType, TransactionType } from "../entity/account.entity";
import { AccountService } from "../services/account.service";
import { SAVINGS_ACCOUNT } from "../constants";

export class AccountController {
  accountService: AccountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  async list(req: Request, res: Response): Promise<any> {
    const accounts = await this.accountService.list(req.userId);

    return res.status(200).json(accounts);
  }
}
