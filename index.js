require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(express.static(__dirname + "/uploaded"));
require("./db");
const Users = require("./models/user_schema");
var whitelist = ["http://localhost", "https://basicpos.netlify.com/"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1", require("./api"));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server is running... on port " + port);
});
