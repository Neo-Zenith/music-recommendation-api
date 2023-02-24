const express = require("express");
const router = express.Router();
const session = require("../middleware/session");
const axios = require("axios");
require("dotenv").config();

router.use(session);

router.get("/", async (req, res, next) => {
    const authCode = req.query.code;
    const redirectUri = "http://localhost:3000/callback";
    const originalUrl = decodeURIComponent(req.query.state);
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", authCode);
    params.append("redirect_uri", redirectUri);
    params.append("client_id", process.env.SPOTIFY_CLIENT_ID);
    params.append("client_secret", process.env.SPOTIFY_KEY);

    const { data } = await axios.post(
        "https://accounts.spotify.com/api/token",
        params,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;
    req.session.accessToken = accessToken;
    req.session.refreshToken = refreshToken;

    res.redirect(originalUrl);
});

module.exports = router;
