const express = require("express");
const router = express.Router();

const { verifyPassword } = require("../middleware/authentication");
const { generateAccessToken } = require("../middleware/authorization");
const Account = require("../model/Account");

router.post("/", async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    let user = await Account.find({ username: username });
    if (user.length != 1) {
        res.status(404).json({
            message: "User not found!",
        });
        console.log("User not found!");
    } else {
        user = user[0];
        const isValid = await verifyPassword(password, user.password);

        if (isValid) {
            const token = generateAccessToken(username);
            res.status(200).json({
                token: token,
                username: username,
            });
            console.log("Login successful!");
        } else {
            res.status(404).json({
                message: "Incorrect password",
            });
            console.log("Incorrect password");
        }
    }
});

module.exports = router;
