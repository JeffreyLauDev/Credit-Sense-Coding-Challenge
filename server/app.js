const express = require('express');
const path = require('path');
const Cors = require("cors");
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();

//USE ENVIRONMENT VARIABLES
require('dotenv').config();

app.use((req, res, next) => {
  res.append("Access-Control-Expose-Headers", "X-Total-Count");
  res.header("Access-Control-Allow-Origin", "*");

  next();
});

// USE CORS
app.use(Cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger("dev"));


app.use(express.static(path.join(__dirname, 'public')));


require("./routes")(app);


app.get("*", (req, res) =>
  res.status(400).send({
    message: "No responsing API existing"
  })
);


module.exports = app;
