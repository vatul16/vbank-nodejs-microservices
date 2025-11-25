"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const data_source_1 = require("../data-source");
const config_1 = require("../config");
const redis_1 = __importDefault(require("../config/redis"));
const credential_entity_1 = require("../entity/credential.entity");
const user_entity_1 = require("../entity/user.entity");
const utils_1 = require("../utils");
const userRegistered_producer_1 = require("../events/producers/userRegistered.producer");
const http_status_codes_1 = require("http-status-codes");
class AuthService {
    credentialRepository;
    userRepository;
    constructor() {
        this.credentialRepository = data_source_1.AppDataSource.getRepository(credential_entity_1.Credential);
        this.userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    }
    async register({ firstName, lastName, email, password }) {
        const existing = await this.credentialRepository.findOneBy({ email });
        if (existing) {
            throw (0, utils_1.createError)("email already in use", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const passwordHash = await bcrypt_1.default.hash(password, 10);
        const user = new user_entity_1.User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        await this.userRepository.save(user);
        const credential = new credential_entity_1.Credential();
        credential.email = email;
        credential.passwordHash = passwordHash;
        credential.user = user;
        await this.credentialRepository.save(credential);
        await (0, userRegistered_producer_1.publishUserRegistered)({
            key: user.id?.toString(),
            value: user,
        });
        return user;
    }
    async login(email, password) {
        const credential = await this.credentialRepository.findOne({
            where: { email },
            relations: ["user"],
        });
        if (!credential) {
            throw (0, utils_1.createError)("invalid credentials", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const isValidPassword = await bcrypt_1.default.compare(password, credential.passwordHash);
        if (!isValidPassword) {
            throw (0, utils_1.createError)("invalid credentials", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const token = jsonwebtoken_1.default.sign({
            id: credential.user.id,
            email: credential.email,
            firstName: credential.user.firstName,
            lastName: credential.user.lastName,
        }, config_1.config.JWT_SECRET, { expiresIn: config_1.config.JWT_EXPIRES_IN });
        await redis_1.default.setex(`auth:${credential.user.id}:${token}`, 24 * 60 * 60, "true");
        return {
            token,
            firstName: credential.user.firstName,
            lastName: credential.user.lastName,
            email: credential.email,
        };
    }
    async logout(userId, token) {
        await redis_1.default.del(`auth:${userId}:${token}`);
    }
}
exports.default = AuthService;
