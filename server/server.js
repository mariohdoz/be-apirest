require("./config/config");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const rutas = require("./routes/index");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Se importan rutas
app.use(rutas);

// Conección BD
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false },
  (err, resp) => {
    if (err) throw err;
    console.log("Base de datos conectada.");
  }
);

module.exports = app;