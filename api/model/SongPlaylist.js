const mongoose = require("mongoose");

const songPlaylistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    songID: String, // fetched externally from Spotify
    playlist: { type: mongoose.Schema.Types.ObjectId, ref: "Playlist" },
});

module.exports = mongoose.model("SongPlaylist", songPlaylistSchema);
