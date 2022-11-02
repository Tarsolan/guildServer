const db = require("./pgAdmin");

const createClient = async (body) => {
  const { firstName, lastName, organization, description, password } = body;
  let sql = `INSERT INTO part2.client(
        status, first_name, last_name, organization, description, password)
        VALUES (true, '${firstName}', '${lastName}', '${organization}', '${description}', '${password}') RETURNING client_id;`;

  var res = await db.query(sql);

  return res.rows[0];
};

const editClient = async (body, id) => {
  const { firstName, lastName, organization, description } = body;
  let sql = `UPDATE part2.client
  SET first_name='${firstName}', last_name='${lastName}', organization='${organization}', description='${description}'
  WHERE client_id='${id}';`;

  try {
    let res = await db.query(sql);

    return res.rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createClient, editClient };
