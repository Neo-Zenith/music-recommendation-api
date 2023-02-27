const bcrypt = require("bcrypt");
require("dotenv").config();

async function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

function isStrongPassword(password) {
    if (password.length < 8) {
        return false;
    }

    // Contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return false;
    }

    // Contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return false;
    }

    // Contains at least one digit
    if (!/\d/.test(password)) {
        return false;
    }

    // Contains at least one special character
    if (!/[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?\\~`]/.test(password)) {
        return false;
    }

    return true;
}

async function verifyPassword(password, hashedPassword) {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
}

function authSpotify(req, res, next) {
    const accessToken = req.session.accessToken;
    if (accessToken == null) {
        const state = req.originalUrl;
        const scopes = "user-read-private user-read-email";
        const redirectUri = "http://localhost:3000/callback";
        console.log(
            "https://accounts.spotify.com/authorize" +
                "?response_type=code" +
                "&client_id=" +
                process.env.SPOTIFY_CLIENT_ID +
                (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
                "&redirect_uri=" +
                encodeURIComponent(redirectUri) +
                "&state=" +
                encodeURIComponent(state)
        );
        res.redirect(
            "https://accounts.spotify.com/authorize" +
                "?response_type=code" +
                "&client_id=" +
                process.env.SPOTIFY_CLIENT_ID +
                (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
                "&redirect_uri=" +
                encodeURIComponent(redirectUri) +
                "&state=" +
                encodeURIComponent(state)
        );
    } else {
        next();
    }
}

module.exports = {
    hashPassword,
    isStrongPassword,
    authSpotify,
    verifyPassword,
};
