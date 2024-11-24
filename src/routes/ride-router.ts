import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares";
import { rideEstimate } from "../controllers";
import { rideEstimateSchema } from "../schemas/ride-schema";

const rideRouter = Router();

rideRouter.post(
  "/estimate",
  validateSchemaMiddleware(rideEstimateSchema),
  rideEstimate
);

export { rideRouter };
