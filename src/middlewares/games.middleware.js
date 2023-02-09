import { db } from "../database/database.connection.js";
import { gameSchema } from "../schemas/Schemas.js";

function validateNewGames(req, res, next) {
  const { name, image, stockTotal, pricePerDay } = req.body;
  const { error } = gameSchema.validate(
    { name, image, stockTotal, pricePerDay },
    {
      abortEarly: false,
    }
  );

  if (error) {
    const message = error.details.map((d) => d.message);
    return res.status(400).send(message);
  }

  res.locals.game = { name, image, stockTotal, pricePerDay };

  next();
}

export { validateNewGames };
