const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function generateAccessToken(username) {
    return jwt.sign({ username }, process.env.JWT, { expiresIn: "43200" });
};
