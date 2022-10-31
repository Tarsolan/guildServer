const db = require("./pgAdmin");

const editMember = async (body) => {
	const {
		member_id,
		firstName,
		lastName,
		raceID,
		newTitle,
		filterDescription,
		rankID,
	} = body;
	let editMem = `UPDATE part2.member
	SET first_name='${firstName}', last_name='${lastName}', title='${newTitle}', rank_id=${rankID}, race_id=${raceID}, description='${filterDescription}'
	WHERE member_id=${member_id};`;

	try {
		let res = await db.query(editMem);

		return res.rows;
	} catch (error) {
		console.log(error);
	}
};

const editMemberSpec = async (body) => {
	const { member_id, specArr } = body;
	let deleteSpec = `DELETE FROM part2.member_spec
  WHERE member_id=${member_id};`;

	let res = await db.query(deleteSpec);

	specArr.map(async (spec) => {
		let editMemSpec = `INSERT INTO part2.member_spec(
         spec_id, member_id)
         VALUES (${spec}, ${member_id});`;

		console.log(spec);
		let res = await db.query(editMemSpec);
		return res.rows;
	});

	return res.rows;
};

// const addMemberSpecs = async (body) => {
//     const { specArr, nextID } = body;
//     specArr.map(async (spec) => {
//       let specQuery = `INSERT INTO part2.member_spec(
//         spec_id, member_id)
//         VALUES (${spec}, ${nextID});`;

//       let res = await db.query(specQuery);
//       return res.rows;
//     });
//   };

module.exports = { editMember, editMemberSpec };
