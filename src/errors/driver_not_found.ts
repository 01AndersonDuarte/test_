import { ApplicationError } from "../utils/types";

export function driverNotFound(errorMessage: string): ApplicationError {
  return {
    error_code: "DRIVER_NOT_FOUND",
    error_description: errorMessage,
  };
}
