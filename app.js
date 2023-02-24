const express = require("express");
const app = express();

const accounts = require("./api/routes/accounts");
const login = require("./api/routes/login");
const signup = require("./api/routes/signup");
const playlist = require("./api/routes/playlist");
const search = require("./api/routes/search");
const callback = require("./api/routes/callback");

var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/accounts", accounts);
app.use("/login", login);
app.use("/signup", signup);
app.use("/playlist", playlist);
app.use("/search", search);
app.use("/callback", callback);

module.exports = app;
