import { addressToEstimateRoute, rideEstimateInput } from "../utils/types";
import { computeRoutes } from "../api";

export async function rideEstimate(rideEstimateData: rideEstimateInput) {
  const requestRideEstimate: addressToEstimateRoute = {
    origin: { address: rideEstimateData.origin },
    destination: { address: rideEstimateData.destination },
  };

  const route = await computeRoutes(requestRideEstimate);

  return route;
}
