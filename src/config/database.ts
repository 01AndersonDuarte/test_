import { MongoClient, Db } from "mongodb";

const url = "mongodb://localhost:27017/shopper";
const client = new MongoClient(url);

let dbInstance: Db | null = null;

async function connectToDatabase() {
  try {
    await client.connect();
    dbInstance = client.db();
    console.log(`Conectado ao MongoDB! Banco: ${dbInstance.databaseName}`);
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
}

connectToDatabase();

export const db = (): Db => {
  if (!dbInstance) {
    throw new Error("Banco de dados não inicializado. Verifique a conexão.");
  }

  return dbInstance;
};
