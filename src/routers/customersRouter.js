import { Router } from "express";
import {
  insertCustomer,
  getCustomers,
  getCustomersById,
} from "../controllers/customerController.js";
/* import { validateNewGames } from "../middlewares/games.middleware.js"; */

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomersById);
customersRouter.post("/customers", insertCustomer);

export default customersRouter;
