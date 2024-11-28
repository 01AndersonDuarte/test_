import server from "./app";
import { seedData } from "./config/seed";

const PORT = 8080;

seedData();

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});
