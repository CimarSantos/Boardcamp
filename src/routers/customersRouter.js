import { Router } from "express";
import {
  insertCustomer,
  getCustomers,
  getCustomersById,
  updateCustomers,
} from "../controllers/customerController.js";
import { validateCustomer } from "../middlewares/customers.middleware.js";

const customersRouter = Router();

customersRouter.post("/customers", validateCustomer, insertCustomer);
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomersById);
customersRouter.put("/customers/:id", validateCustomer, updateCustomers); 

export default customersRouter;
