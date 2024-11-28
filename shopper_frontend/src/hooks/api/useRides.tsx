import useAsync from "../useAsync";
import * as ridesApi from "../../services/ridesApi";
import { RideConfirmType, RideEstimateBody } from "../../utils/types";

export function useRideEstimate() {
  const {
    data: rideEstimateData,
    loading: rideEstimateLoading,
    error: rideEstimateError,
    act: createRideEstimate,
  } = useAsync(
    (rideEstimate: RideEstimateBody) =>
      ridesApi.createRideEstimate(rideEstimate),
    false
  );

  return {
    rideEstimateData,
    rideEstimateLoading,
    rideEstimateError,
    createRideEstimate,
  };
}

export function useRideConfirm() {
  const {
    data: rideConfirmData,
    loading: rideConfirmLoading,
    error: rideConfirmError,
    act: confirmRide,
  } = useAsync(
    (rideConfirm: RideConfirmType) => ridesApi.confirmRide(rideConfirm),
    false
  );

  return {
    rideConfirmData,
    rideConfirmLoading,
    rideConfirmError,
    confirmRide,
  };
}
