import { Router } from "express";
import { rideEstimate } from "../controllers";

const rideRouter = Router();

rideRouter.post("/estimate", rideEstimate);

export { rideRouter };
