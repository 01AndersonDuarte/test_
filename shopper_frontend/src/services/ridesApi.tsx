import api from "./api";
import { RideEstimateBody } from "../utils/types";

export async function createRideEstimate(rideEstimate: RideEstimateBody) {
  const response = await api.post("ride/estimate", rideEstimate);

  return response.data;
}
