import { Router } from "express";
import { getDriversIds } from "../controllers";

const driversRouter = Router();

driversRouter.get("/", getDriversIds);

export { driversRouter };
