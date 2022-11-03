const db = require("./pgAdmin");

const addMission = async (body) => {
  let newMission = `INSERT INTO part2.mission(
      job_name, job_description, payout, deadline_date, client_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING mission_num;`;

  let res = await db.query(newMission, [
    body.missionTitle,
    body.missionDesc,
    body.missionPayout,
    body.missionDeadline,
    body.client_id,
  ]);

  return res.rows[0];
};

const editMission = async (body) => {
  const {
    mission_num,
    job_name,
    job_description,
    payout,
    deadline_date,
    complete,
  } = body;
  let sql = `UPDATE part2.mission
	SET job_name=$2, job_description=$3, payout=$4, deadline_date=$5, complete=$6
	WHERE mission_num=$1;`;

  let res = await db.query(sql, [
    mission_num,
    job_name,
    job_description,
    payout,
    deadline_date,
    complete,
  ]);

  return res.rows;
};

const addReport = async (body) => {
  const { mission_num, member_id, report_details } = body;
  let sql = `INSERT INTO part2.mission_report(
    mission_num, member_id, report_details)
    VALUES ($1, $2, $3);`;

  let res = await db.query(sql, [mission_num, member_id, report_details]);

  let missionSQL = `UPDATE part2.mission
	SET complete=true
	WHERE mission_num=$1;`;

  await db.query(missionSQL, [mission_num]);

  return res.rows;
};

const editReport = async (body, id) => {
  const { details } = body;
  let sql = `UPDATE part2.mission_report
	SET report_details=$1
	WHERE report_id=$2;`;

  await db.query(sql, [details, id]);
};

module.exports = { addMission, editMission, addReport, editReport };
