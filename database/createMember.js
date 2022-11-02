const db = require("./pgAdmin");

const getRaces = async () => {
  let raceQuery = `SELECT race_id, race FROM part2.race
    ORDER BY race_id ASC `;

  let res = await db.query(raceQuery);

  return res.rows;
};

const getSpecs = async () => {
  let specQuery = `SELECT spec_id, spec_name FROM part2.specialization
    ORDER BY spec_id ASC `;

  let res = await db.query(specQuery);

  return res.rows;
};

const addMember = async (body) => {
  const { firstName, lastName, password, raceID, title, filterDescription } =
    body;
  let newMember = `INSERT INTO part2.member(
    first_name, last_name, title, rank_id, race_id, description, password)
    VALUES ('${firstName}', '${lastName}', '${title}', 1, ${raceID}, '${filterDescription}', '${password}') RETURNING member_id;`;

  let res = await db.query(newMember);

  return res.rows[0];
};

const addMemberSpecs = async (specArr, id) => {
  specArr.map(async (spec) => {
    let specQuery = `INSERT INTO part2.member_spec(
      spec_id, member_id)
      VALUES (${spec}, ${id});`;

    let res = await db.query(specQuery);
    return res.rows;
  });
};

module.exports = { getRaces, getSpecs, addMember, addMemberSpecs };
