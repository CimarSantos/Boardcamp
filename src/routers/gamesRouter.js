import { Router } from "express";
import { getGames, insertGames } from "../controllers/gamesController.js";
import { validateNewGames } from "../middlewares/games.middleware.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validateNewGames, insertGames);

export default gamesRouter;
