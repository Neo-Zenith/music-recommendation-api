const http = require("http");
const port = process.env.port || 3000;
const app = require("./app");

const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
    "mongodb+srv://Neo-Zenith:" +
        process.env.MONGODB_PW +
        "@music-recommendation-db.gdyksx9.mongodb.net/music-recommendation?retryWrites=true&w=majority"
);

const server = http.createServer(app);
server.listen(port);
