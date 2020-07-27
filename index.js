require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(express.static(__dirname + "/uploaded"));
app.use(express.json());
require("./db");
const Users = require("./models/user_schema");

var allowedOrigins = ['http://localhost:3000',
  'https://basicpos.netlify.app'];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return res.json({ status: 'error', msg });
    }
    return callback(null, true);
  }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1", require("./api"));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server is running... on port " + port);
});
