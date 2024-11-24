import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { invalidDataError } from "../errors";

export function validateSchemaMiddleware(schema: ObjectSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const validation = schema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      return next(invalidDataError(validation.error.message));
    }

    next();
  };
}
