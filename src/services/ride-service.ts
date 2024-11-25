import {
  addressToEstimateRoute,
  driver,
  driverInput,
  rideConfirmInput,
  rideEstimateInput,
  rideEstimateResult,
} from "../utils/types";
import { computeRoutes } from "../api";
import * as errors from "../errors";

const drivers = [
  {
    id: 1,
    name: "Homer Simpson",
    description:
      "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
    vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
    review: {
      rating: 2 / 5,
      comment:
        "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
    },
    rate: 250,
    minKm: 1,
  },
  {
    id: 2,
    name: "Dominic Toretto",
    description:
      "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
    vehicle: "Dodge Charger R/T 1970 modificado",
    review: {
      rating: 4 / 5,
      comment:
        "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
    },
    rate: 5000,
    minKm: 5,
  },
  {
    id: 3,
    name: "James Bond",
    description:
      "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
    vehicle: "Aston Martin DB5 clássico",
    review: {
      rating: 5 / 5,
      comment:
        "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
    },
    rate: 10000,
    minKm: 10,
  },
];

function getDrivers(distanceMeters: number): driver[] {
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

  const driversOptions: driver[] = getDrivers(cleanRoute.distanceMeters);

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

function validateRide(driver: driverInput, distance: number): boolean | void {
  const driverData = drivers.find((driver) => driver.id === driver.id);

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
  const isAValidRide = validateRide(driver, distance);

  if (isAValidRide) {
  }
}
