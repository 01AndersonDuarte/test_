export type ApplicationError = {
  error_code: string;
  error_description: string;
};

export type rideEstimateInput = {
  customer_id: string;
  origin: string;
  destination: string;
};
