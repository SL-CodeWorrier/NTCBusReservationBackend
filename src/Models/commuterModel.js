const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

const commuterSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    addressNo: { type: String, required: true },
    addressFirstLine: { type: String, required: true },
    addressSecondLine: { type: String, required: false },
    city: { type: String, required: true },
    province: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true }, // Unique User reference
}, { timestamps: true });

module.exports = mongoose.model("Commuter", commuterSchema);