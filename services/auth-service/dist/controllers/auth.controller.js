"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const zod_1 = require("zod");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const registerSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(3).max(50),
    lastName: zod_1.z.string().min(3).max(50),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6).max(100),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
class AuthController {
    authService;
    constructor() {
        this.authService = new auth_service_1.default();
    }
    register = async (req, res) => {
        const { firstName, lastName, email, password } = registerSchema.parse(req.body);
        const user = await this.authService.register({
            firstName,
            lastName,
            email,
            password,
        });
        return res.status(201).json(user);
    };
    login = async (req, res) => {
        const { email, password } = loginSchema.parse(req.body);
        const { token } = await this.authService.login(email, password);
        return res.status(200).json({ token });
    };
    logout = async (req, res) => {
        await this.authService.logout(req.userId, req.token);
        return res.status(200).json({ message: "logged out successfully" });
    };
}
exports.AuthController = AuthController;
