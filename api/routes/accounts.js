const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authentication/auth-verify-token");

const Account = require("../model/accounts");

router.get("/:accountID", (request, response, next) => {});

module.exports = router;
