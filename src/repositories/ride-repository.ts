import { db } from "../config/database";
import { rideConfirmInput } from "../utils/types";

export async function insertRide(rideToInsert: rideConfirmInput) {
  const dbInstance = db();
  const collection = dbInstance.collection("ride");

  await collection.insertOne(rideToInsert);
}
