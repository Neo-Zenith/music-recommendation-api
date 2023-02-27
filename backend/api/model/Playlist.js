const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
});

module.exports = mongoose.model("Playlist", playlistSchema);
