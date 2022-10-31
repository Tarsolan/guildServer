const { MongoClient } = require("mongodb");
const uri = process.env.URI; // replace this line with your own database information

const client = new MongoClient(uri);

module.exports = { client };
