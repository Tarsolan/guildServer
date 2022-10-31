const { client } = require("./mongo");

const searchMission = async (body) => {
  const { searchText } = body;
  await client.connect();
  const cursor = client
    .db("Guild")
    .collection("missions")
    .find({ $text: { $search: searchText } });
  const results = await cursor.toArray();
  // console.log(results);

  return results;
};

const searchMissionReport = async (body) => {
  const { searchText } = body;
  await client.connect();
  const cursor = client
    .db("Guild")
    .collection("mission_reports")
    .find({ $text: { $search: searchText } });
  const results = await cursor.toArray();
  // console.log(results);

  return results;
};

module.exports = { searchMission, searchMissionReport };
