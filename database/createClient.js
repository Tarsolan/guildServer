const db = require("./pgAdmin");

const createClient = async (body) => {
  const { first_name, last_name, organization, description, password } = body;
  let sql = `INSERT INTO part2.client(
        status, first_name, last_name, organization, description, password)
        VALUES (true, $1, $2, $3, $4, $5) RETURNING client_id;`;

  var res = await db.query(sql, [
    first_name,
    last_name,
    organization,
    description,
    password,
  ]);

  return res.rows[0];
};

const editClient = async (body, id) => {
  const { first_name, last_name, organization, description } = body;
  let sql = `UPDATE part2.client
  SET first_name=$1, last_name=$2, organization=$3, description=$4
  WHERE client_id=$5;`;

  try {
    let res = await db.query(sql, [
      first_name,
      last_name,
      organization,
      description,
      id,
    ]);

    return res.rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createClient, editClient };
