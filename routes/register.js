const express = require("express");
const router = express.Router();

const { addMember, addMemberSpecs } = require("../database/createMember");
const { createClient } = require("../database/createClient");

router.post("/member", async (req, res) => {
  DEBUG && console.log(req.url);
  let response = await addMember(req.body);
  res.status(200).send(response);
});

router.post("/member/specs", async (req, res) => {
  DEBUG && console.log(req.url);
  let response = await addMemberSpecs(req.body);
  res.status(200).send(response);
});

router.post("/member/spec/:id", async (req, res) => {
  DEBUG && console.log(req.url);
  let response = await addMemberSpecs(req.body, req.params.id);
  res.status(200).send(response);
});

router.post("/client", async (req, res) => {
  DEBUG && console.log(req.url);
  let response = await createClient(req.body);
  res.status(200).send(response);
});

module.exports = router;
