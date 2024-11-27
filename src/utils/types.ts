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

export type coordinate = {
  latitude: number;
  longitude: number;
};

export type driver = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
};

export type rideEstimateResult = {
  origin: coordinate;
  destination: coordinate;
  distance: number;
  duration: string;
  options: driver[] | [];
  routeResponse: Array<any>;
};

export type driverInput = {
  id: number;
  name: string;
};

export type rideConfirmInput = {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: driverInput;
  value: number;
};

export type ridesConfirmedFilters = {
  customerId: string;
  driverId?: number;
};

export type rideResponse = {
  id: number;
  date: Date;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: driverInput;
  value: string;
};

export type ridesConfirmedResponse = {
  customer_id: string;
  rides: rideResponse[];
};
