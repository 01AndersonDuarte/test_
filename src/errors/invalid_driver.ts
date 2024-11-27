import { ApplicationError } from "../utils/types";

export function invalidDriver(errorMessage: string): ApplicationError {
  return {
    error_code: "INVALID_DRIVER",
    error_description: errorMessage,
  };
}
