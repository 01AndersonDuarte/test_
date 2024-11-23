import Joi from "joi";
import { rideEstimate } from "../utils/types";

export const rideEstimateSchema = Joi.object<rideEstimate>({
  customer_id: Joi.string().required(),
  origin: Joi.string().required(),
  destination: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (value === helpers.state.ancestors[0].origin) {
        return helpers.error("any.invalid", { field: "destination" });
      }
      return value;
    })
    .messages({
      "any.invalid": `The "destination" cannot be the same as the "origin"`,
    }),
});
