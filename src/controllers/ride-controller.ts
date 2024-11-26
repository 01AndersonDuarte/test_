import httpStatus from "http-status";
import { Request, Response } from "express";
import * as rideService from "../services/ride-service";
import {
  rideConfirmInput,
  rideEstimateInput,
  rideEstimateResult,
} from "../utils/types";

export async function rideEstimate(req: Request, res: Response) {
  const body = req.body as rideEstimateInput;

  const result = await rideService.rideEstimate(body);

  res.status(httpStatus.OK).send(result);
}

export async function rideConfirm(req: Request, res: Response) {
  const body = req.body as rideConfirmInput;

  await rideService.rideConfirm(body);

  res.status(httpStatus.OK).send({ success: true });
}
