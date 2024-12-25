// Required modules for schema creation
const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

// Reservation schema definition
const reservationSchema = new mongoose.Schema({
    reservedDateTime: { type: Date, required: true },                  // Date and time of reservation
    listOfSeats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seat", required: true }], // List of reserved seats (array of Seat ObjectIds)
    commuter: { type: mongoose.Schema.Types.ObjectId, ref: "Commuter", required: true }, // Foreign Key to Commuter
    startLocation: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true }, // Foreign Key to Location
    endLocation: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true }, // Foreign Key to Location
    route: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },       // Foreign Key to Route
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Exporting the Reservation model
module.exports = mongoose.model("Reservation", reservationSchema);