const express = require("express");
const router = express();
const axios = require("axios");
const session = require("../middleware/session");
require("dotenv").config();

const { authSpotify } = require("../middleware/authentication");

router.use(session);

router.get("/", authSpotify, async (req, res, next) => {
    const searchTerm = req.query.q;
    const accessToken = req.session.accessToken;

    const response = await axios.get("https://api.spotify.com/v1/search", {
        params: {
            q: searchTerm,
            type: "track,artist,album",
            limit: 10,
        },
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    });
    res.json(response.data);
});

module.exports = router;
