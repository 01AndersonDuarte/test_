import useAsync from "../useAsync";
import * as ridesApi from "../../services/ridesApi";
import { Filters, RideConfirmType, RideEstimateBody } from "../../utils/types";

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

export function getRidesConfirmed() {
  const {
    data: ridesConfirmedData,
    loading: ridesConfirmedLoading,
    error: ridesConfirmedError,
    act: getRidesConfirmed,
  } = useAsync(
    (filters: Filters) => ridesApi.getRidesConfirmed(filters),
    false
  );

  return {
    ridesConfirmedData,
    ridesConfirmedLoading,
    ridesConfirmedError,
    getRidesConfirmed,
  };
}
