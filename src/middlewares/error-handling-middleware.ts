import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ApplicationError } from "../utils/types";

export function handleApplicationErrors(
  error: ApplicationError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error.error_code === "INVALID_DATA") {
    res.status(httpStatus.BAD_REQUEST).send(error);

    return;
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error_code: "InternalServerError",
    error_description: "Internal Server Error",
  });
}
