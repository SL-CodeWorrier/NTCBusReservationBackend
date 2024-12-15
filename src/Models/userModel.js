const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema({
    phonenumber : {type: String, required: true, unique: true},
    username : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    role : {type: String, required: true, enum : ["admin", "bus_operator", "commuter"]},
    isVerified : {type: Boolean, required: false},
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);