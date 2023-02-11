import { customerSchema } from "../schemas/Schemas.js";

function validateCustomer(req, res, next) {
  const { name, phone, cpf, birthday } = req.body;
  const { error } = customerSchema.validate(
    { name, phone, cpf, birthday },
    {
      abortEarly: false,
    }
  );

  if (error) {
    const message = error.details.map((d) => d.message);
    return res.status(400).send(message);
  }

  res.locals.game = { name, phone, cpf, birthday };

  next();
}

export { validateCustomer };
