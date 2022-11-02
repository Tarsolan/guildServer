const db = require("./pgAdmin");

const getMember = async (id) => {
  // let memberList = await selectAgent(client);
  let memberQuery = `SELECT member_id, first_name ||' '|| last_name full_name, me.description as desc, title, join_date, rank_name, race, image_url FROM part2."member" me
  JOIN part2.rank rn USING (rank_id)
  JOIN part2.race ra USING (race_id)
  WHERE member_id = ${id}`;

  let res = await db.query(memberQuery);
  //console.log(res.rows);
  return res.rows[0];
};

const getMembers = async () => {
  // let memberList = await selectAgent(client);
  let memberQuery = `SELECT member_id, first_name ||' '|| last_name full_name, me.description as desc, title, join_date, rank_name, race, image_url, point_total FROM part2."member" me
  JOIN part2.rank rn USING (rank_id)
  JOIN part2.race ra USING (race_id)
  ORDER BY member_id ASC`;

  let res = await db.query(memberQuery);
  //console.log(res.rows);
  return res.rows;
};

const getMemberSpec = async (id) => {
  let specQuery = `SELECT spec_name FROM part2.member mem
JOIN part2.member_spec mspec USING (member_id)
JOIN part2.specialization spec USING (spec_id)
JOIN part2.rank rn USING (rank_id)
WHERE member_id = ${id}`;

  let res = await db.query(specQuery);

  // This is here for a bit of formatting
  let arr = [];
  res.rows.forEach((row) => {
    arr.push(row.spec_name);
  });

  return arr;
};

const getMissions = async () => {
  let missionQuery = `SELECT mission_num, job_name, job_description, payout, first_name ||' '|| last_name contact_name, organization, deadline_date, complete  FROM part2.mission
    JOIN part2.client USING (client_id)
    ORDER BY mission_num ASC`;

  let res = await db.query(missionQuery);

  return res.rows;
};

const getMissionReports = async (id) => {
  let sql = `SELECT report_id, member_id, first_name ||' '|| last_name AS name, mission_num, report_details FROM part2.mission_report
  JOIN part2.mission USING (mission_num)
  JOIN part2.member USING (member_id)
  WHERE mission_num = ${id}`;

  let res = await db.query(sql);

  return res.rows;
};

const getClients = async () => {
  let clientQuery = `SELECT client_id, first_name ||' '|| last_name contact_name, organization, description FROM part2.client
  WHERE status = true`;

  let res = await db.query(clientQuery);

  return res.rows;
};

const getClient = async (id) => {
  let clientQuery = `SELECT client_id, first_name, last_name, organization, description FROM part2.client
  WHERE client_id = ${id}`;

  let res = await db.query(clientQuery);

  return res.rows;
};

const getClientOrgNames = async () => {
  let clientQuery = `SELECT organization FROM part2.client
  ORDER BY client_id ASC;`;

  let res = await db.query(clientQuery);
  DEBUG && console.log(res.rows);
  return res.rows;
};

const getMissionsPerMember = async (name) => {
  let missionMemberQuery = `SELECT * FROM part2.missions_per_member
  WHERE member_name = '${name}'`;

  let res = await db.query(missionMemberQuery);

  if (res.rows[0] === undefined) {
    return 0;
  } else {
    return res.rows[0].count;
  }
};

const getMemberMissionDetails = async (id) => {
  let memberMissionQuery = `SELECT mission_num, job_name, report_details FROM part2.mission_report
  JOIN part2.mission USING (mission_num)
  WHERE member_id = '${id}'
  ORDER BY report_id ASC `;

  let res = await db.query(memberMissionQuery);

  if (res.rows === undefined) {
    return 0;
  } else {
    return res.rows;
  }
};

const getRanks = async () => {
  let rankQuery = `SELECT rank_id, rank_name FROM part2.rank
  ORDER BY rank_id ASC`;

  let res = await db.query(rankQuery);

  return res.rows;
};

module.exports = {
  getMember,
  getMembers,
  getMissions,
  getMissionReports,
  getClients,
  getClientOrgNames,
  getMemberSpec,
  getMissionsPerMember,
  getMemberMissionDetails,
  getRanks,
  getClient,
};
