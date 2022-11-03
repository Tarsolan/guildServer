const express = require("express");
const router = express.Router();

const {
  addMission,
  editMission,
  addReport,
  editReport,
} = require("../database/createMission");

const {
  getMission,
  getMissions,
  getMissionReports,
} = require("../database/fetchDataList");

router.get("/", async (req, res) => {
  DEBUG && console.log(req.url);
  var resMiss = await getMissions();
  // console.log(resMiss);
  for (miss of resMiss) {
    // console.log("mission num", miss.mission_num);
    var resMisRep = await getMissionReports(miss.mission_num);
    // console.log(miss.mission_num, resMisRep);
    if (resMisRep === undefined) {
      miss.reports = [];
    } else {
      miss.reports = resMisRep;
    }
  }

  res.status(200).send(resMiss);
});

router.get("/:id", async (req, res) => {
  DEBUG && console.log(req.url);
  var resMiss = await getMission(req.params.id);
  var resMisRep = await getMissionReports(req.params.id);

  if (resMisRep === undefined) {
    resMiss.reports = [];
  } else {
    resMiss.reports = resMisRep;
  }

  res.status(200).send(resMiss);
});

router.post("/new", async (req, res) => {
  let response = await addMission(req.body);
  res.status(200).send(response);
});

router.put("/edit", async (req, res) => {
  let response = await editMission(req.body);
  res.status(200).send(response);
});

router.post("/reports/new", async (req, res) => {
  let response = await addReport(req.body);
  res.status(200).send(response);
});

router.put("/reports/edit/:id", async (req, res) => {
  let response = await editReport(req.body, req.params.id);
  res.status(200).send(response);
});

module.exports = router;
