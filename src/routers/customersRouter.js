import { Router } from "express";
import {
  insertCustomer,
  getCustomers,
  getCustomersById,
} from "../controllers/customerController.js";
import { validateNewCustomer } from "../middlewares/customers.middleware.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomersById);
customersRouter.post("/customers", validateNewCustomer, insertCustomer);

export default customersRouter;
