import { Router } from "express";
import {
  insertRental,
  getRental,
  updateRental,
  deleteRental,
} from "../controllers/rentalsController.js";
import {
  validateRental,
  ifExistRentalValidation,
} from "../middlewares/rentals.middleware.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateRental, insertRental);
rentalsRouter.get("/rentals", getRental);
rentalsRouter.post("/rentals/:id/return", updateRental);
rentalsRouter.delete("/rentals/:id", deleteRental);

export default rentalsRouter;
