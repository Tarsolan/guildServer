/*********************************************************************************************************************\

A Full Stack Application

Developer: Alex Ridgeley
Date: 2022 (kind of the whole thing)

Objective:

To create a website for a guild that I am a part of (in a LARP)! I thought it would be fun to create
something that I enjoyed working with, and I think it has been great practice so far. As I'm sure
you will see, this website has been built as I learn. Every day, when we learn a new concept, I
try to find a way to incorporate it here. Because of that, not everything is done in the MOST
efficient manner, but it does work! 

You'll need to use both MongoDB and postgreSQL to make proper use of this site. There is a backup
of the PG database and a copy of several CSV files that you can import into Mongo.


TO RUN THE APP:

1)  Install postgreSQL and MongoDB. Create a database and restore the backup DB found in the 'db-backups' folder.
    Create a MongoDB database called 'Guild', and add the following collections:
      'missions'          <----------- import the 'missions.csv' file here
      'mission_reports'   <----------- import the 'reports.csv' file here

2)  Inside the 'server' folder, create a new file called '.env'. Paste the following into that new file, replacing the placeholder data with your info:

URI="<your MongoDB connect URI>"

HOST="<the host name for your postgreSQL database>"
USER="<your user account name in pgAdmin>"
DB_PORT=<the port where you run your database>
PASSWORD="<user password for postgres>"
DATABASE="<the name of your postgres database>"

PORT=<the port you on which want the server to run>

3)  In your terminal, navigate to the 'server' folder and run this command:
          npm i         <----------- This will install the node_modules necessary to run the server.

4)  After this is complete, navigate to the 'client' folder, and run the following two commands to start everything:
          npm i
          npm run dev

This will run both of the modules at once, and the React app should load in a browser window.

\*********************************************************************************************************************/

const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const access_control = process.env.SITE_URL;
global.DEBUG = true;

var cors = require("cors");
app.use(cors({ origin: SITE_URL }));

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", access_control);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

const newMemberRouter = require("./routes/register");
const missionRouter = require("./routes/missions");
const memberRouter = require("./routes/members");
const raceRouter = require("./routes/races");
const clientRouter = require("./routes/clients");
const specRouter = require("./routes/specs");
const searchEngine = require("./routes/search");

app.use("/register", newMemberRouter);
app.use("/members", memberRouter);
app.use("/races", raceRouter);
app.use("/missions", missionRouter);
app.use("/clients", clientRouter);
app.use("/specs", specRouter);
app.use("/search", searchEngine);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
