const express = require("express");
const router = express.Router();

const { getRaces } = require("../database/createMember");
const { getRanks } = require("../database/fetchDataList");

router.get("/", async (req, res) => {
  var response = await getRaces();
  res.status(200).send(response);
});

router.get("/ranks", async (req, res) => {
  var response = await getRanks();
  res.status(200).send(response);
});

module.exports = router;
