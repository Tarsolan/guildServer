const express = require("express");
const router = express.Router();

const {
  searchMission,
  searchMissionReport,
} = require("../database/searchMission.dal");

router.post("/missions", async (req, res) => {
  let response = await searchMission(req.body);
  res.status(200).send(response);
});

router.post("/reports", async (req, res) => {
  let response = await searchMissionReport(req.body);
  res.status(200).send(response);
});

module.exports = router;
