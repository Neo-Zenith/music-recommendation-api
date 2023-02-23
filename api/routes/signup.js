const express = require("express");
const router = express();
const mongoose = require("mongoose");

const Account = require("../model/accounts");

const isStrongPassword = require("../middleware/handler/isStrongPassword");
const hashPassword = require("../middleware/handler/hashPassword");
const generateToken = require("../middleware/authentication/auth-generate-token");

router.post("/", async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    Account.find({ username: username }, async (err, user) => {
        if (user.length != 0) {
            res.status(404).json({
                message: "Username is taken!",
            });
        }

        if (isStrongPassword(password)) {
            try {
                const hashedPassword = await hashPassword(password);
                console.log(hashedPassword);
                const user = new Account({
                    _id: new mongoose.Types.ObjectId(),
                    username: username,
                    name: name,
                    password: hashedPassword,
                });
                await user.save();
                const token = generateToken(username);
                res.status(200).json({
                    token: token,
                    username: username,
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({
                    message: "Failed to create user!",
                });
            }
        } else {
            res.status(404).json({
                message: "Password does not meet requirements!",
            });
        }
    });
});

module.exports = router;
