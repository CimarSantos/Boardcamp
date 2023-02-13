import { db } from "../database/database.connection.js";

async function insertCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const { rowCount } = await db.query(
      `INSERT INTO customers (name, phone, cpf, birthday) 
      SELECT $1, $2, $3, $4 WHERE NOT EXISTS (SELECT * FROM customers WHERE cpf = $5);`,
      [name, phone, cpf, birthday, cpf]
    );
    if (rowCount === 1) return res.sendStatus(201);
    else return res.status(409).send("CPF já cadastrado, tente outro.");
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function getCustomers(req, res) {
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

  const createData = formatDate(data);

  try {
    const customers = await db.query("SELECT * FROM customers");
    const formmattedCustomers = customers.rows.map((customer) => {
      const birthday = formatDate(new Date(customer.birthday));
      return { ...customer, birthday: birthday };
    });

    res.send(formmattedCustomers);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function getCustomersById(req, res) {
  const { id } = req.params;
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

  const createData = formatDate(data);

  try {
    const customers = await db.query("SELECT * FROM customers WHERE id = $1", [
      id,
    ]);
    if (!customers.rows.length)
      return res.status(404).send("Este usuário não existe.");

    const formmattedCustomers = customers.rows.map((customer) => {
      const birthday = formatDate(new Date(customer.birthday));
      return { ...customer, birthday: birthday };
    });

    res.send(formmattedCustomers);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function updateCustomers(req, res) {
  const { id } = req.params;
  const { name, phone, cpf, birthday } = req.body;
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

  const createData = formatDate(data);

  try {
      const ifCpfExists = await db.query(
        `SELECT * FROM customers WHERE cpf = $1`,
        [cpf]
      );
      if (ifCpfExists.rowCount > 0 && ifCpfExists.rows[0].id !== parseInt(id)) {
        return res
          .status(409)
          .send("Este CPF já existe. Verifique e tente novamente.");
      }
      
    const result = await db.query(
      "UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5",
      [name, phone, cpf, birthday, id]
    );

    const formmattedCustomers = result.rows.map((customer) => {
      const birthday = formatDate(new Date(customer.birthday));
      return { ...customer, birthday: birthday };
    });

    if (result.rowCount === 0)
      return res.status(404).send("Este usuário não existe.");

    res.send(formmattedCustomers);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export { insertCustomer, getCustomers, getCustomersById, updateCustomers };
