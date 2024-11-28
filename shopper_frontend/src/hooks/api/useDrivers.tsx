import useAsync from "../useAsync";
import * as driversApi from "../../services/driversApi";

export function useDrivers() {
  const {
    data: driversData,
    loading: driversLoading,
    error: driversError,
    act: getDrivers,
  } = useAsync(() => driversApi.getDrivers(), true);

  return {
    driversData,
    driversLoading,
    driversError,
    getDrivers,
  };
}
