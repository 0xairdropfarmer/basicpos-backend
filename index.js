require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(express.static(__dirname + "/uploaded"));
require("./db");
const Users = require("./models/user_schema");
var corsOptions = {
  origin: "https://basicpos.netlify.com/",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1", require("./api"));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server is running... on port " + port);
});
