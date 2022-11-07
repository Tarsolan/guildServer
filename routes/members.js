const express = require("express");
const router = express.Router();

const {
  getMembers,
  getMember,
  getMemberSpec,
  getMissionsPerMember,
  getMemberMissionDetails,
} = require("../database/fetchDataList");

const { verifyPassword } = require("../database/handleLogin");

const {
  editMember,
  editMemberSpec,
  editMemberPoints,
} = require("../database/editMember");

router.get("/", async (req, res) => {
  DEBUG && console.log(req.url);
  var resMem = await getMembers();
  for (mem of resMem) {
    var resSpec = await getMemberSpec(mem.member_id);
    mem.spec = resSpec;
    var misCom = await getMissionsPerMember(mem.full_name);
    mem.completed = misCom;
    var memMisDet = await getMemberMissionDetails(mem.member_id);
    mem.missionDetails = memMisDet;
  }

  res.status(200).send(resMem);
});

router.get("/:id", async (req, res) => {
  var mem = await getMember(req.params.id);
  var resSpec = await getMemberSpec(mem.member_id);
  mem.spec = resSpec;
  var misCom = await getMissionsPerMember(mem.full_name);
  mem.completed = misCom;
  var memMisDet = await getMemberMissionDetails(mem.member_id);
  mem.missionDetails = memMisDet;

  res.status(200).send(mem);
});

router.get("/spec/:id", (req, res) => {
  getMemberSpec(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.post("/login", async (req, res) => {
  let response = await verifyPassword(req.body);
  DEBUG && console.log(response);
  res.status(200).send(response);
});

router.put("/edit", async (req, res) => {
  DEBUG && console.log("Edit request.");
  let response = await editMember(req.body);

  res.status(200).send(response);
});

router.put("/edit/points/:id", async (req, res) => {
  DEBUG && console.log("Edit request.");
  let response = await editMemberPoints(req.body, req.params.id);

  res.status(200).send(response);
});

router.post("/edit/spec/:id", async (req, res) => {
  DEBUG && console.log(req.url);
  let response = await editMemberSpec(req.body, req.params.id);
  res.status(200).send(response);
});

module.exports = router;
