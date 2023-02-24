const express = require("express");
const router = express.Router();

const post = require("../controller/playlists/post");
const { authenticateToken } = require("../middleware/authorization");

const Account = require("../model/Account");
const Playlist = require("../model/Playlist");
const SongPlaylist = require("../model/SongPlaylist");

router.get("/all", authenticateToken, async (req, res, next) => {
    const user = (await Account.find({ username: req.user.username }))[0];
    let playlists = await Playlist.find({ owner: user.id });

    // user has no playlists yet
    if (playlists.length == 0) {
        res.status(200).json({
            message: "User has no playlist!",
        });
    } else {
        res.status(200).json(playlists);
    }
});

router.get("/:playlistID", authenticateToken, async (req, res, next) => {
    const playlistID = req.params.playlistID;
    const user = (await Account.find({ username: req.user.username }))[0];
    let playlist = (await Playlist.find({ id: playlistID }))[0];

    if (playlist.owner != user.id) {
        res.sendStatus(401);
    } else {
        const songs = await SongPlaylist.find({ playlist: playlist.id });

        if (songs.length == 0) {
            res.status(200).json({
                message: "The playlist is empty!",
            });
        } else {
            res.status(200).json({
                message: "Implement fetching from Spotify for song details",
            });
        }
    }
});

router.post("/", authenticateToken, async (req, res, next) => {
    const user = (await Account.find({ username: req.user.username }))[0];
    const playlistName = req.body.playlistName;

    const playlistID = await post(user, playlistName);
    res.status(200).json({
        playlistID: playlistID,
    });
});

module.exports = router;
