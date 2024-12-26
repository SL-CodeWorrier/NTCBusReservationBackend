// Required modules for schema creation
const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

// Seat schema definition
const seatSchema = new mongoose.Schema({
    number: { type: String, required: true },                 // Seat number
    isAvailable: { type: Boolean, required: true },           // Availability status
    isBookingInProgress: { type: Boolean, required: true },   // Booking in progress status
    isWindowSeat: { type: Boolean, required: true },          // Indicates if the seat is a window seat
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true }, // Foreign Key to Bus
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Exporting the Seat model
module.exports = mongoose.model("Seat", seatSchema);