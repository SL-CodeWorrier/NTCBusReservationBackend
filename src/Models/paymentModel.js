// Required modules for schema creation
const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

// Payment schema definition
const paymentSchema = new mongoose.Schema({
    paidDateTime: { type: Date, required: true },                   // Date and time of the payment
    reservationId: { type: mongoose.Schema.Types.ObjectId, ref: "Reservation", required: false }, // Foreign Key to Reservation (optional)
    amountForOneSeat: { type: Number, required: true },             // Amount for a single seat
    numberOfSeats: { type: Number, required: true },                // Number of seats paid for
    totalAmount: { type: Number, required: true, default: function () { // Total amount calculated by default
        return this.amountForOneSeat * this.numberOfSeats;
    }},
    commuter: { type: mongoose.Schema.Types.ObjectId, ref: "Commuter", required: true }, // Foreign Key to Commuter
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Exporting the Payment model
module.exports = mongoose.model("Payment", paymentSchema);