"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRouter = void 0;
const express_1 = require("express");
const config_1 = require("../config");
const indexRouter = (0, express_1.Router)();
exports.indexRouter = indexRouter;
indexRouter.get("/", async (req, res) => {
    return res.json({ service: config_1.config.SERVICE_NAME, status: "running" });
});
indexRouter.get("/health", async (req, res) => {
    return res.json({ service: config_1.config.SERVICE_NAME, status: "ok" });
});
