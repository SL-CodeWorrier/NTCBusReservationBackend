// Required modules for schema creation
const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

// TimeTable schema definition
const timeTableSchema = new mongoose.Schema({
    arrivalTime: { type: String, required: true },           // Scheduled arrival time
    departureTime: { type: String, required: true },         // Scheduled departure time
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true }, // Foreign Key to Bus
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true }, // Foreign Key to Bus
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Exporting the TimeTable model
module.exports = mongoose.model("TimeTable", timeTableSchema);