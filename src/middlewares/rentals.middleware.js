import { db } from "../database/database.connection.js";
import { rentalSchema } from "../schemas/Schemas.js";

async function validateRental(req, res, next) {
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

  const checkCustomerExists = await db.query(
    "SELECT * FROM customers WHERE id = $1",
    [customerId]
  );
  if (checkCustomerExists.rows.length === 0) {
    return res.status(400).send("Este cliente não existe");
  }
  const checkGameExists = await db.query("SELECT * FROM games WHERE id = $1", [
    gameId,
  ]);
  if (checkGameExists.rows.length === 0) {
    return res.status(400).send("Este jogo não existe");
  }

  const checkGameAvailability = await db.query(
    `SELECT count(*) FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL`,
    [gameId]
  );

  const rentedGames = checkGameAvailability.rows[0].count;

  const checkStock = await db.query(
    `SELECT "stockTotal" FROM games WHERE id = $1`,
    [gameId]
  );

  const gameStock = checkStock.rows[0].stockTotal;
  console.log(gameStock);
  if (gameStock - rentedGames <= 0) {
    return res
      .status(400)
      .send("No momento não existe este jogo disponível para aluguel.");
  }

  res.locals.rental = { customerId, gameId, daysRented };

  next();
}

export { validateRental };
