"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const logger_1 = __importDefault(require("./config/logger"));
const data_source_1 = require("./data-source");
const config_1 = require("./config");
const init_1 = __importDefault(require("./init"));
const index_route_1 = require("./routes/index.route");
const auth_route_1 = require("./routes/auth.route");
const error_middleware_1 = require("./middlewares/error.middleware");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const req_middleware_1 = require("./middlewares/req.middleware");
const cors_middleware_1 = require("./middlewares/cors.middleware");
const shutdown_1 = require("./utils/shutdown");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(cors_middleware_1.corsMiddleware);
app.use(req_middleware_1.reqLogger);
app.use(express_1.default.json());
app.use(auth_middleware_1.verifyToken);
app.use("/", index_route_1.indexRouter);
app.use("/api/v1/auth", auth_route_1.authRouter);
app.use(error_middleware_1.errorHandler);
data_source_1.AppDataSource.initialize()
    .then(async () => {
    await (0, init_1.default)();
    const server = app.listen(config_1.config.PORT, () => {
        logger_1.default.info(`${config_1.config.SERVICE_NAME} is running on http://localhost:${config_1.config.PORT}`);
    });
    (0, shutdown_1.setupGracefulShutdown)(server);
})
    .catch((err) => {
    logger_1.default.error("error during Data Source initialization", err);
});
