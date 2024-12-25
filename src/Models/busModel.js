// Required modules for schema creation
const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

// Bus schema definition
const busSchema = new mongoose.Schema({
    busRegNumber: { type: String, required: true, unique: true }, // Bus Registration Number
    isAvailable: { type: Boolean, required: true },              // Availability status
    isCTBorPrivate: { type: String, required: true },           // CTB (true) or Private (false)
    isValidated: { type: Boolean, required: true },              // Validation status
    isACorNonAC: { type: String, required: true },              // AC (true) or Non-AC (false)
    busOperator: { type: mongoose.Schema.Types.ObjectId, ref: "BusOperator", required: true }, // Foreign Key to BusOperator
    route: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },             // Foreign Key to Route
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Exporting the Bus model
module.exports = mongoose.model("Bus", busSchema);