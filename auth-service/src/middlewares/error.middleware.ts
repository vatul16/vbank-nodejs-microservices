import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import logger from "../config/logger";
import { CustomError } from "../types";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  logger.error(error);

  if (error instanceof z.ZodError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Invalid input",
      errors: error.errors,
    });
    return;
  }

  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message || "Internal server error";
  const status = error.status || "error";

  if (process.env.NODE_ENV !== "production") {
    logger.error({
      message,
      stack: error.stack,
      path: req.path,
      method: req.method,
      body: req.body,
      query: req.query,
    });
  }

  res.status(statusCode).json({
    status,
    message,
  });
};
