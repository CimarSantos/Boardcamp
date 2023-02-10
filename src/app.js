import express from "express";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import gamesRouter from "./routers/gamesRouter.js";
import customersRouter from "./routers/customersRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(gamesRouter);
app.use(customersRouter);

app.listen(process.env.PORT, () =>
  console.log(chalk.cyan(`Server runnig on port ${process.env.PORT}`))
);
