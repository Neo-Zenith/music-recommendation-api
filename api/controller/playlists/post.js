const mongoose = require("mongoose");

const Playlist = require("../../model/Playlist");

async function post(owner, name) {
    const playlist = new Playlist({
        _id: new mongoose.Types.ObjectId(),
        owner: owner.id,
        name: name,
    });

    await playlist.save();
    return playlist.id;
}

module.exports = post;
