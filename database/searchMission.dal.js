const db = require("./pgAdmin");

const searchMission = async (body) => {
  const { searchText } = body;
  let sql = `SELECT * FROM part2.mission
  WHERE to_tsvector(job_description) @@ to_tsquery($1);`;

  let res = await db.query(sql, [searchText]);
  //console.log(res.rows);
  return res.rows;
};

const searchMissionReport = async (body) => {
  const { searchText } = body;
  let sql = `SELECT * FROM part2.mission_report
  WHERE to_tsvector(report_details) @@ to_tsquery($1);`;

  let res = await db.query(sql, [searchText]);
  //console.log(res.rows);
  return res.rows;
};

module.exports = { searchMission, searchMissionReport };
