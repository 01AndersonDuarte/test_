import { Request, Response } from "express";
import httpStatus from "http-status";

export async function rideEstimate(req: Request, res: Response) {
  const { body } = req;
  res.status(httpStatus.OK).send(body);
}
