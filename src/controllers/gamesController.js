import { db } from "../database/database.connection.js";

async function insertGames(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  try {
    const { rowCount } = await db.query(
      `INSERT INTO games (name, image, "stockTotal", "pricePerDay") 
      SELECT $1, $2, $3, $4 WHERE NOT EXISTS (SELECT * FROM games WHERE name = $5);`,
      [name, image, stockTotal, pricePerDay, name]
    );
    if (rowCount === 1) return res.status(201).send("Jogo criado com sucesso!");
    else
      return res.status(409).send("Este jogo já está cadastrado, tente outro.");
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function getGames(_, res) {
  try {
    const games = await db.query("SELECT * FROM games");
    res.send(games.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export { getGames, insertGames };
