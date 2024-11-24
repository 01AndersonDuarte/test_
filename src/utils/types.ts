export type ApplicationError = {
  error_code: string;
  error_description: string;
};

export type rideEstimateInput = {
  customer_id: string;
  origin: string;
  destination: string;
};

export type addressToEstimateRoute = {
  origin: {
    address: string;
  };
  destination: {
    address: string;
  };
};
