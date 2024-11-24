import httpStatus from "http-status";
import { Request, Response } from "express";
import * as rideService from "../services/ride-service";
import { rideEstimateInput } from "../utils/types";

export async function rideEstimate(req: Request, res: Response) {
  const body = req.body as rideEstimateInput;

  const result = await rideService.rideEstimate(body);

  res.status(httpStatus.OK).send(result);
}
