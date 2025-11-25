import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import {
  AccountType,
  Account,
  TransactionType,
} from "../entity/account.entity";
import { createError, generateAccountNumber } from "../utils";
import { ERROR_CODES, SAVINGS_ACCOUNT } from "../constants";
import { publishAccountCreated } from "../events/producers/accountCreated.producer";
import { publishAccountDeleted } from "../events/producers/accountDeleted.producer";
import logger from "../config/logger";

interface AccountCreateDto {
  userId: number;
  accountType?: AccountType;
  accountName?: string;
}

export class AccountService {
  accountRepository: Repository<Account>;

  constructor() {
    this.accountRepository = AppDataSource.getRepository(Account);
  }

  async list(userId: number) {
    const accounts = await this.accountRepository.find({
      where: { userId },
    });

    return accounts;
  }
}

export const accountService = new AccountService();
