// Required modules for schema creation
const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

// BusOperator schema definition
const busOperatorSchema = new mongoose.Schema({
    businessPhoneNumber: { type: String, required: true, unique: true }, // Operator's business contact number
    isWorkingProfile: { type: Boolean, required: true },  // Indicates if the profile is active
    operatorNumber: { type: String, required: true, unique: true },     // Unique identifier for the bus operator
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, // Foreign Key to User
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Exporting the BusOperator model
module.exports = mongoose.model("BusOperator", busOperatorSchema);