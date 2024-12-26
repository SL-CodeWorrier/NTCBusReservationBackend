// Required modules for schema creation
const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

// Location schema definition
const locationSchema = new mongoose.Schema({
    Name: { type: String, required: true },       // Name of the current location
    route: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true }, // Foreign Key to Route
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Exporting the Location model
module.exports = mongoose.model("Location", locationSchema);
