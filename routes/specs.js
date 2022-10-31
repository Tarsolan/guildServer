const express = require("express");
const router = express.Router();

const { getSpecs } = require("../database/createMember");

router.get("/", async (req, res) => {
  var response = await getSpecs();
  res.status(200).send(response);
});

module.exports = router;
