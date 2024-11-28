import api from "./api";
import { RideConfirmType, RideEstimateBody } from "../utils/types";

export async function createRideEstimate(rideEstimate: RideEstimateBody) {
  const response = await api.post("ride/estimate", rideEstimate);

  return response.data;
}

export async function confirmRide(confirmRideBody: RideConfirmType) {
  const response = await api.patch("ride/confirm", confirmRideBody);

  return response.data;
}
