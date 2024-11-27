import useAsync from "../useAsync";
import * as ridesApi from "../../services/ridesApi";
import { RideEstimateBody } from "../../utils/types";

export function useCreateRideEstimate() {
  const {
    data: createRideEstimateData,
    loading: createRideEstimateLoading,
    error: createRideEstimateError,
    act: createRideEstimate,
  } = useAsync(
    (rideEstimate: RideEstimateBody) =>
      ridesApi.createRideEstimate(rideEstimate),
    false
  );

  return {
    createRideEstimateData,
    createRideEstimateLoading,
    createRideEstimateError,
    createRideEstimate,
  };
}
