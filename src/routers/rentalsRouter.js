import { Router } from "express";
import { insertRental, getRental } from "../controllers/rentalsController.js";
import { validateRental } from "../middlewares/rentals.middleware.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateRental, insertRental);
rentalsRouter.get("/rentals", getRental);

export default rentalsRouter;
