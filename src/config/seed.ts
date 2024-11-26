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
import { db } from "./database";

const seedData = async () => {
  try {
    const database = await db();
    const driversCollection = database.collection("drivers");

    const result = await driversCollection.insertMany(drivers);

    console.log(`Inseridos ${result.insertedCount} documentos!`);
  } catch (error) {
    console.error("Erro ao popular a coleção:", error);
  }
};

seedData();
