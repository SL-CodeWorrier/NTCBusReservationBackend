javascript
// Required modules for schema creation
const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

// Location schema definition
const locationSchema = new mongoose.Schema({
    currentLocationName: { type: String, required: true },       // Name of the current location
    dateTime: { type: Date, required: true },                    // Date and time of the location record
    route: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true }, // Foreign Key to Route
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },     // Foreign Key to Bus
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Exporting the Location model
module.exports = mongoose.model("Location", locationSchema);
