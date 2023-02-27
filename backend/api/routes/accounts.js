const express = require("express");
const router = express();

const put = require("../controller/accounts/put");
const { authenticateToken } = require("../middleware/authorization");

const Account = require("../model/Account");
const Playlist = require("../model/Playlist");

router.get("/:username", authenticateToken, async (req, res, next) => {
    const queryUsername = req.params.username;
    if (queryUsername != req.user.username) {
        res.sendStatus(403);
    } else {
        let user = (await Account.find({ username: req.user.username }))[0];
        let playlists = await Playlist.find({ owner: user.id });
        const maskedUser = {
            ...user.toObject(),
            password: undefined,
            __v: undefined,
        };
        res.status(200).json({
            user: maskedUser,
            playlists: playlists,
        });
    }
});

router.put("/:username", authenticateToken, async (req, res, next) => {
    const newUsername = req.body.newUsername;
    const newPassword = req.body.newPassword;
    const newName = req.body.newName;
    const username = req.params.username;

    const user = (await Account.find({ username: username }))[0];
    const update = await put(user, newUsername, newPassword, newName);

    switch (update) {
        case -1:
            res.status(400).json({
                message: "Username has been taken!",
            });
            break;

        case 0:
            res.status(400).json({
                message: "Password does not meet minimum requiremnets!",
            });
            break;

        default:
            const user = (await Account.find({ username: newUsername }))[0];
            const maskedUser = {
                ...user.toObject(),
                password: undefined,
                __v: undefined,
            };
            maskedUser["token"] = update;
            res.status(200).json(maskedUser);
    }
});

module.exports = router;
