import httpStatus from "http-status";
import { Request, Response } from "express";
import * as rideService from "../services/ride-service";
import { rideConfirmInput, rideEstimateInput } from "../utils/types";
import * as errors from "../errors";
import { ridesConfirmedFilters } from "../utils/types";

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

export async function getRidesConfirmed(req: Request, res: Response) {
  const { customer_id: customerId } = req.params;
  const { driver_id: driverId } = req.query;
  const filters: ridesConfirmedFilters = {
    customerId,
  };

  if (driverId && isNaN(Number(driverId))) {
    throw errors.invalidDriver("Invalid driver");
  } else if (driverId) {
    filters.driverId = Number(driverId);
  }

  const ridesFiltered = await rideService.getRidesConfirmed(filters);

  res.status(httpStatus.OK).send(ridesFiltered);
}
