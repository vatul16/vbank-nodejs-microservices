import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { StatusCodes } from "http-status-codes";
import redis from "../config/redis";

const publicRoutes = [
  "/",
  "/health",
  "/api/v1/auth/register",
  "/api/v1/auth/login",
];

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  if (publicRoutes.includes(req.path)) {
    return next();
  }

  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "invalid authorization header", path: req.path });
  }

  jwt.verify(token, config.JWT_SECRET, async (err: any, decoded: any) => {
    if (err) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: "unauthorized" });
    }

    const redisKey = `auth:${decoded.id}:${token}`;
    const redisToken = await redis.get(redisKey);

    if (!redisToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "unauthorized" });
    }

    req.userId = decoded.id;
    req.token = token;

    return next();
  });
};
