import "express-async-errors";
import express, { Request, Response } from "express";
import cors from "cors";

import { handleApplicationErrors } from "./middlewares/error-handling-middleware";

const server = express();
server
  .use(cors())
  .use(express.json())
  .use("/health", (req: Request, res: Response) => {
    res.send({ message: "I'm fine!" });
  })
  .use(handleApplicationErrors);

export default server;
