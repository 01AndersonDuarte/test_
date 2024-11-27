import { Collection } from "mongodb";
import { UUIDTypes, v4 as uuidv4 } from "uuid";
import { db } from "../config/database";
import {
  driver,
  rideConfirmInput,
  ridesConfirmedFilters,
} from "../utils/types";

type RideDocument = {
  _id: UUIDTypes;
  date: Date;
  customer_id: string;
  driver_id: number;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  value: number;
};

type RideFilters = {
  customer_id: string;
  driver_id?: number;
};

type DriverDocument = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  rate: number;
  minKm: number;
};

async function getRidesCollection(): Promise<Collection<RideDocument>> {
  const dbInstance = await db();

  return dbInstance.collection("ride");
}

async function getDriversCollection(): Promise<Collection<DriverDocument>> {
  const dbInstance = await db();

  return dbInstance.collection("drivers");
}

export async function getDrivers(): Promise<DriverDocument[]> {
  const driversCollection = await getDriversCollection();

  return await driversCollection.find().toArray();
}

export async function getDriverById(
  driverId: number
): Promise<DriverDocument | null> {
  const driversCollection = await getDriversCollection();
  const key = { id: driverId };

  return driversCollection.findOne(key);
}

export async function insertRide(rideConfirm: rideConfirmInput) {
  const ridesCollection = await getRidesCollection();

  const rideToInsert: RideDocument = {
    _id: uuidv4(),
    date: new Date(),
    customer_id: rideConfirm.customer_id,
    driver_id: rideConfirm.driver.id,
    origin: rideConfirm.origin,
    destination: rideConfirm.destination,
    distance: rideConfirm.distance,
    duration: rideConfirm.duration,
    value: rideConfirm.value,
  };

  await ridesCollection.insertOne(rideToInsert);
}

export async function getRides(filters: ridesConfirmedFilters) {
  const ridesCollection = await getRidesCollection();
  let pipeline = [];
  let key: RideFilters = { customer_id: filters.customerId };

  if (filters.driverId && filters.driverId >= 0) {
    key = { ...key, driver_id: filters.driverId };
  }

  pipeline.push({ $match: key });
  pipeline.push(
    {
      $lookup: {
        from: "drivers",
        localField: "driver_id",
        foreignField: "id",
        as: "driver",
      },
    },
    {
      $unwind: "$driver",
    }
  );
  pipeline.push({
    $project: {
      _id: 1,
      date: 1,
      origin: 1,
      destination: 1,
      distance: 1,
      duration: 1,
      value: 1,
      driver: {
        id: "$driver.id",
        name: "$driver.name",
      },
    },
  });
  pipeline.push({ $sort: { date: -1 } });

  return await ridesCollection.aggregate(pipeline).toArray();
}
