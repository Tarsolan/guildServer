const { getClient, getClientMissions } = require("./clientLogin");
const db = require("./pgAdmin");

const verifyPassword = async (body) => {
	const { title, password } = body;
	DEBUG && console.log(title);
	DEBUG && console.log(password);
	let memberQuery = `SELECT password FROM part2.member
  WHERE title = '${title}'`;

	const res = await db.query(memberQuery);

	if (password === res.rows[0].password) {
		DEBUG && console.log("Password verified.");
		return true;
	} else {
		DEBUG && console.log("Invalid password.");
		return false;
	}
};

const verifyClient = async (body) => {
	const { orgName, password } = body;
	let verified = false;
	DEBUG && console.log(orgName);
	DEBUG && console.log(password);
	let memberQuery = `SELECT password, status FROM part2.client
  WHERE organization = '${orgName}'`;

	var res = await db.query(memberQuery);

	try {
		if (res.rows[0].status !== true) {
			DEBUG && console.log("Client inactive.");
			return JSON.stringify(`inactive`);
		}
		if (password === res.rows[0].password) {
			DEBUG && console.log("Password verified.");
			verified = true;
		} else {
			DEBUG && console.log("Invalid password.");
			return JSON.stringify(`noPass`);
		}
	} catch (error) {
		DEBUG && console.log("Error. Client does not exist.");
		return JSON.stringify(`noClient`);
	}

	if (verified) {
		var client = await getClient(orgName);
		var clientMissions = await getClientMissions(orgName);
		var clientObj = { ...client, missions: clientMissions };
		DEBUG && console.log(clientObj);
		return clientObj;
	}
};
module.exports = { verifyPassword, verifyClient };
