import * as driversRepository from "../repositories/drivers-repository";

export async function getDriversIds() {
  return await driversRepository.getDriversIds();
}

export async function getDrivers() {
  return await driversRepository.getDrivers();
}

export async function getDriverById(driverId: number) {
  return await driversRepository.getDriverById(driverId);
}
