import { db } from "../config/database";
import { rideConfirmInput } from "../utils/types";

async function getRideCollection() {
  const dbInstance = db();
  const collection = dbInstance.collection("ride");

  return collection;
}

export async function insertRide(rideToInsert: rideConfirmInput) {
  const rideCollection = await getRideCollection();

  const result = await rideCollection.insertOne({ rideToInsert });
}
