import { db } from "../database/database.connection.js";

async function insertRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  const data = new Date();

  const zeroFill = (n) => {
    return n < 9 ? `0${n}` : `${n}`;
  };
  const formatDate = (date) => {
    const d = zeroFill(date.getDate());
    const mo = zeroFill(date.getMonth() + 1);
    const y = zeroFill(date.getFullYear());

    return `${y}-${mo}-${d}`;
  };

  const rentDate = formatDate(data);

  try {
    const checkCustomerExists = await db.query(
      "SELECT * FROM customers WHERE id = $1",
      [customerId]
    );
    if (checkCustomerExists.rows.length === 0) {
      return res.status(400).send("Este cliente não existe");
    }
    const checkGameExists = await db.query(
      "SELECT * FROM games WHERE id = $1",
      [gameId]
    );
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
    const gameStock = checkStock.rows[0].stock;
    if (rentedGames >= gameStock) {
      return res
        .status(400)
        .send("No momento não existe este jogo disponível para aluguel.");
    }

    const getGamePrice = await db.query(
      `SELECT "pricePerDay" FROM games WHERE id = $1`,
      [gameId]
    );
    const dailyPrice = getGamePrice.rows[0].pricePerDay;
    const originalPrice = daysRented * dailyPrice;

    const rental = await db.query(
      `INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice") VALUES ($1, $2, $3, $4, $5)`,
      [customerId, gameId, daysRented, rentDate, originalPrice]
    );

    return res.status(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function getRental(req, res) {
  /* try {
    const result = await db.query(
      `SELECT 
        rentals.id, 
        rentals.customerId, 
        rentals.gameId, 
        rentals.rentDate, 
        rentals.daysRented, 
        rentals.returnDate, 
        rentals.originalPrice, 
        rentals.delayFee, 
        customers.id AS customer_id, 
        customers.name AS customer_name, 
        games.id AS game_id, 
        games.name AS game_name 
      FROM 
        rentals 
        JOIN customers ON rentals.customerId = customers.id 
        JOIN games ON rentals.gameId = games.id;`
    );
    res.status(200).send(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  } */
}
async function updateRental(req, res) {}
async function deleteRental(req, res) {}

export { insertRental, getRental, updateRental, deleteRental };
