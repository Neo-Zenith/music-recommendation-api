const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateAccessToken(username) {
    return jwt.sign({ username }, process.env.JWT, { expiresIn: "12h" });
}

function authenticateToken(request, response, next) {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return response.sendStatus(401);

    jwt.verify(token, process.env.JWT.toString(), (err, user) => {
        if (err) {
            return response.sendStatus(403);
        }

        request.user = user;

        next();
    });
}

module.exports = {
    generateAccessToken,
    authenticateToken,
};
