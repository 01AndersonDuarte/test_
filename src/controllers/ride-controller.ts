import httpStatus from "http-status";
import { Request, Response } from "express";
import { rideEstimateInput } from "../utils/types";

export async function rideEstimate(req: Request, res: Response) {
  const body = req.body as rideEstimateInput;

  res.status(httpStatus.OK).send(body);
}
