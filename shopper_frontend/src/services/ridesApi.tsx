import api from "./api";
import { Filters, RideConfirmType, RideEstimateBody } from "../utils/types";

export async function createRideEstimate(rideEstimate: RideEstimateBody) {
  const response = await api.post("ride/estimate", rideEstimate);

  return response.data;
}

export async function confirmRide(confirmRideBody: RideConfirmType) {
  const response = await api.patch("ride/confirm", confirmRideBody);

  return response.data;
}

export async function getRidesConfirmed(filters: Filters) {
  if (typeof filters.driver_id !== "string") {
    const queryParams = {
      driver_id: filters.driver_id,
    };

    return await api.get(`ride/${filters.customer_id}`, {
      params: queryParams,
    });
  }

  return await api.get(`ride/${filters.customer_id}`);
}
