import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ApplicationError } from "../utils/types";

export function handleApplicationErrors(
  error: ApplicationError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
