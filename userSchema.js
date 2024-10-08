const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userID: String,
    password: String
});

const User = mongoose.model("User", UserSchema);

module.exports = User;