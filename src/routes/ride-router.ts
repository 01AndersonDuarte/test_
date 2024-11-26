import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares";
import { rideEstimate, rideConfirm } from "../controllers";
import { rideConfirmSchema, rideEstimateSchema } from "../schemas/ride-schema";

const rideRouter = Router();

rideRouter
  .post("/estimate", validateSchemaMiddleware(rideEstimateSchema), rideEstimate)
  .patch("/confirm", validateSchemaMiddleware(rideConfirmSchema), rideConfirm);

export { rideRouter };
