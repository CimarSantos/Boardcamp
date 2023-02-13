import { rentalSchema } from "../schemas/Schemas.js";

function validateRental(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;
  const { error } = rentalSchema.validate(
    { customerId, gameId, daysRented },
    {
      abortEarly: false,
    }
  );

  if (error) {
    const message = error.details.map((d) => d.message);
    return res.status(400).send(message);
  }

  res.locals.rental = { customerId, gameId, daysRented };

  next();
}

export { validateRental };
