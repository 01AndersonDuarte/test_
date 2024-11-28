import { Collection } from "mongodb";
import { db } from "../config/database";

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

async function getDriversCollection(): Promise<Collection<DriverDocument>> {
  const dbInstance = await db();

  return dbInstance.collection("drivers");
}

export async function getDriversIds() {
  const driversCollection = await getDriversCollection();

  return await driversCollection
    .find({}, { projection: { id: 1, name: 1 } })
    .toArray();
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
