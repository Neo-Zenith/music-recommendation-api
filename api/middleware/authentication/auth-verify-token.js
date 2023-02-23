const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function authenticateToken(request, response, next) {
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
};
