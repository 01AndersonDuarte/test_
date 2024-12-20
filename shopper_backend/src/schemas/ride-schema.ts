import Joi from "joi";

export const rideEstimateSchema = Joi.object({
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

export const rideConfirmSchema = rideEstimateSchema.concat(
  Joi.object({
    distance: Joi.number().integer().required(),
    duration: Joi.string().required(),
    driver: Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
    }).required(),
    value: Joi.number().required(),
  })
);
