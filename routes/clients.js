const express = require("express");
const router = express.Router();

const {
  getClient,
  getClients,
  getClientOrgNames,
} = require("../database/fetchDataList");
const { verifyClient } = require("../database/handleLogin");
const { editClient } = require("../database/createClient");

router.get("/", (req, res) => {
  DEBUG && console.log(req.url);
  getClients()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get("/orgNames", async (req, res) => {
  DEBUG && console.log(req.url);
  let response = await getClientOrgNames();

  res.status(200).send(response);
});

router.post("/login", async (req, res) => {
  let response = await verifyClient(req.body);
  DEBUG && console.log(response);
  res.status(200).send(response);
});

router.get("/:id", async (req, res) => {
  let response = await getClient(req.params.id);
  DEBUG && console.log(response);
  res.status(200).send(response);
});

router.put("/edit/:id", async (req, res) => {
  let response = await editClient(req.body, req.params.id);
  DEBUG && console.log(response);
  res.status(200).send(response);
});

module.exports = router;
