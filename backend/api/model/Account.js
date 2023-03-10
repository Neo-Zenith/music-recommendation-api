const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    name: String,
});

module.exports = mongoose.model("Account", accountSchema);
