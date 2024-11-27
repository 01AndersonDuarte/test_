import { ApplicationError } from "../utils/types";

export function noRidesFound(errorMessage: string): ApplicationError {
  return {
    error_code: "NO_RIDES_FOUND",
    error_description: errorMessage,
  };
}
