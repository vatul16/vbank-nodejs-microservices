"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = exports.DecimalColumnTransformer = exports.TransactionType = exports.AccountStatus = exports.AccountType = void 0;
const typeorm_1 = require("typeorm");
var AccountType;
(function (AccountType) {
    AccountType["SAVINGS"] = "savings";
    AccountType["CURRENT"] = "current";
})(AccountType || (exports.AccountType = AccountType = {}));
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["ACTIVE"] = "active";
    AccountStatus["FROZEN"] = "frozen";
    AccountStatus["CLOSED"] = "closed";
})(AccountStatus || (exports.AccountStatus = AccountStatus = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["CREDIT"] = "credit";
    TransactionType["DEBIT"] = "debit";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
class DecimalColumnTransformer {
    to(data) {
        return data;
    }
    from(data) {
        return parseFloat(data);
    }
}
exports.DecimalColumnTransformer = DecimalColumnTransformer;
let Account = class Account {
    id;
    userId;
    accountNumber;
    accountName;
    accountType;
    accountStatus;
    balance;
    currency;
    createdAt;
    updatedAt;
    closedAt;
};
exports.Account = Account;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Account.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id" }),
    __metadata("design:type", Number)
], Account.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
        name: "account_number",
        length: 15,
        comment: "Numeric account identifier stored as string",
    }),
    __metadata("design:type", String)
], Account.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "account_name", nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "accountName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "account_type",
        type: "enum",
        enum: AccountType,
        default: AccountType.SAVINGS,
    }),
    __metadata("design:type", String)
], Account.prototype, "accountType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "account_status",
        type: "enum",
        enum: AccountStatus,
        default: AccountStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Account.prototype, "accountStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "balance",
        type: "decimal",
        precision: 10,
        scale: 2,
        default: 0,
        transformer: new DecimalColumnTransformer(),
    }),
    __metadata("design:type", Number)
], Account.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "currency", default: "INR", length: 3 }),
    __metadata("design:type", String)
], Account.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Account.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Account.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "closed_at", nullable: true }),
    __metadata("design:type", Date)
], Account.prototype, "closedAt", void 0);
exports.Account = Account = __decorate([
    (0, typeorm_1.Entity)()
], Account);
