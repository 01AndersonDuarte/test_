import { MongoClient, Db } from "mongodb";

const url = process.env.DATABASE_URL || "mongodb://localhost:27017/shopper";
const client = new MongoClient(url);

let dbInstance: Db | null = null;

async function connectToDatabase() {
  try {
    await client.connect();
    dbInstance = client.db();
    console.log(`Connected to MongoDB! Database: ${dbInstance.databaseName}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

export const db = async (): Promise<Db> => {
  await connectToDatabase();

  if (!dbInstance) {
    throw new Error("Database uninitialized. Check the connection.");
  }

  return dbInstance;
};
