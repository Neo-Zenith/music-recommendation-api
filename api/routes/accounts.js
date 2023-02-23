const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authentication/auth-verify-token");

const Account = require("../model/accounts");

router.get("/:accountID", verifyToken, (req, res, next) => {
    res.status(200).json({
        message: "Passed!",
    });
});

module.exports = router;
