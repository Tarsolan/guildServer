const db = require("./pgAdmin");

const getClient = async (orgName) => {
  let clientInfoQuery = `SELECT client_id, status, first_name, last_name, organization, description FROM part2.client
    WHERE organization = '${orgName}'`;

  var resClient = await db.query(clientInfoQuery);

  return resClient.rows[0];
};

const getClientMissions = async (orgName) => {
  let clientMissions = `SELECT client_id, mission_num, job_name, job_description FROM part2.mission
    JOIN part2.client USING (client_id)
    WHERE organization = '${orgName}'`;

  var resMission = await db.query(clientMissions);
  var missionArr = [];
  resMission.rows.forEach((mission) => {
    missionArr.push(mission.mission_num);
  });

  DEBUG && console.log(missionArr);

  return missionArr;
};

module.exports = { getClient, getClientMissions };
