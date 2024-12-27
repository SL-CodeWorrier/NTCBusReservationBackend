// Required modules for schema creation
const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

// Location schema definition
const ticketSchema = new mongoose.Schema({
    price: { type: Number, required: true }, // Price of the trip
    seat: { type: mongoose.Schema.Types.ObjectId, ref: "Seat", required: true }, // Foreign Key to Seat
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true }, // Foreign Key to Bus
    timeTable: { type: mongoose.Schema.Types.ObjectId, ref: "TimeTable", required: true }, // Foreign Key to Bus
    route: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true }, // Foreign Key to Route
    reservation: { type: mongoose.Schema.Types.ObjectId, ref: "Reservation", required: true }, // Foreign Key to Reservation
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Exporting the Location model
module.exports = mongoose.model("Ticket", ticketSchema);
