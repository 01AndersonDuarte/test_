import { ApplicationError } from "../utils/types";

export function invalidDistance(errorMessage: string): ApplicationError {
  return {
    error_code: "INVALID_DISTANCE",
    error_description: errorMessage,
  };
}
