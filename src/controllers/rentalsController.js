import { db } from "../database/database.connection.js";

async function insertRental(req, res) {
  const { customerId, gameId, daysRented } = res.locals.rental;

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

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function getRental(req, res) {
  try {
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
  }
}
async function updateRental(req, res) {}
async function deleteRental(req, res) {}

export { insertRental, getRental, updateRental, deleteRental };
