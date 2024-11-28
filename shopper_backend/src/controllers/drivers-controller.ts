import { Request, Response } from "express";
import * as driversServices from "../services/drivers-service";
import httpStatus from "http-status";

export async function getDriversIds(req: Request, res: Response) {
  const result = await driversServices.getDriversIds();

  res.status(httpStatus.OK).send(result);
}
