import { Router } from "express";
import {
  insertRental,
  getRental,
  deleteRental,
} from "../controllers/rentalsController.js";
import {
  validateRental,
  deleteRentalValidation,
} from "../middlewares/rentals.middleware.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateRental, insertRental);
rentalsRouter.get("/rentals", getRental);
rentalsRouter.delete("/rentals/:id", deleteRentalValidation, deleteRental);

export default rentalsRouter;
