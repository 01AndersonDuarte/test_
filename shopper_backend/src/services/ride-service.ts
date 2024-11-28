import {
  addressToEstimateRoute,
  driver,
  driverInput,
  rideConfirmInput,
  rideEstimateInput,
  rideEstimateResult,
  ridesConfirmedResponse,
} from "../utils/types";
import { computeRoutes } from "../api";
import * as errors from "../errors";
import * as rideRepository from "../repositories";
import * as driversServices from "../services";
import { ridesConfirmedFilters } from "../utils/types";

async function getDrivers(distanceMeters: number): Promise<driver[]> {
  const drivers = await driversServices.getDrivers();
  const oneKmToMeters = 1000;
  const distanceInKm = distanceMeters / oneKmToMeters;

  const options = drivers
    .map((driver) => {
      if (distanceInKm >= driver.minKm) {
        const oneRealInCents = 100;
        const value = (driver.rate / oneRealInCents) * distanceInKm;

        const driverOption: driver = {
          id: driver.id,
          name: driver.name,
          description: driver.description,
          vehicle: driver.vehicle,
          review: driver.review,
          value,
        };

        return driverOption;
      }
    })
    .filter(
      (driverOption): driverOption is driver => driverOption !== undefined
    );

  return options;
}

export async function rideEstimate(
  rideEstimateData: rideEstimateInput
): Promise<rideEstimateResult> {
  const requestRideEstimate: addressToEstimateRoute = {
    origin: { address: rideEstimateData.origin },
    destination: { address: rideEstimateData.destination },
  };

  const { response, cleanRoute } = await computeRoutes(requestRideEstimate);

  const driversOptions = await getDrivers(cleanRoute.distanceMeters);

  const result: rideEstimateResult = {
    origin: cleanRoute.startLocation,
    destination: cleanRoute.endLocation,
    distance: cleanRoute.distanceMeters,
    duration: cleanRoute.duration,
    options: driversOptions.sort((a, b) => a.value - b.value),
    routeResponse: response,
  };

  return result;
}

async function validateRide(
  driver: driverInput,
  distance: number
): Promise<boolean | void> {
  const driverData = await driversServices.getDriverById(driver.id);

  if (driverData) {
    const isAValidMileage = distance >= driverData?.minKm;

    if (isAValidMileage) {
      return true;
    } else {
      throw errors.invalidDistance(
        `The distance provided is not valid for the driver ${driver.name}`
      );
    }
  }

  throw errors.driverNotFound("The driver id provided is invalid");
}

export async function rideConfirm(
  rideConfirmData: rideConfirmInput
): Promise<void> {
  const { driver, distance } = rideConfirmData;
  const isAValidRide = await validateRide(driver, distance);

  if (isAValidRide) {
    return await rideRepository.insertRide(rideConfirmData);
  }
}

export async function getRidesConfirmed(
  filters: ridesConfirmedFilters
): Promise<ridesConfirmedResponse> {
  if (filters.driverId && filters.driverId >= 0) {
    const isAValidDriver = await driversServices.getDriverById(
      filters.driverId
    );

    if (!isAValidDriver) throw errors.invalidDriver("Invalid driver");
  }

  const rides = await rideRepository.getRides(filters);

  if (rides.length === 0) {
    throw errors.noRidesFound("No trips were found");
  }

  const ridesConfirmed: ridesConfirmedResponse = {
    customer_id: filters.customerId,
    rides: rides.map((ride) => ({
      id: ride._id,
      date: ride.date,
      origin: ride.origin,
      destination: ride.destination,
      distance: ride.distance,
      duration: ride.duration,
      driver: {
        id: ride.driver.id,
        name: ride.driver.name,
      },
      value: ride.value,
    })),
  };

  return ridesConfirmed;
}
