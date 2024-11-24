import { ApplicationError } from "../utils/types";

export function invalidDataError(errorMessage: string): ApplicationError {
  return {
    error_code: "INVALID_DATA",
    error_description: errorMessage,
  };
}
