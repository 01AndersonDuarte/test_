import { Collection } from "mongodb";
import { UUIDTypes, v4 as uuidv4 } from "uuid";
import { db } from "../config/database";
import { rideConfirmInput, ridesConfirmedFilters } from "../utils/types";

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

async function getRidesCollection(): Promise<Collection<RideDocument>> {
  const dbInstance = await db();

  return dbInstance.collection("ride");
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
  pipeline.push({
    $project: {
      _id: 1,
      date: 1,
      origin: 1,
      destination: 1,
      distance: 1,
      duration: 1,
      value: 1,
    },
  });
  pipeline.push({ $sort: { date: -1 } });

  return await ridesCollection.aggregate(pipeline).toArray();
}
