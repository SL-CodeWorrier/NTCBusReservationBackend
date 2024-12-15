// Required modules for schema creation
const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

// Permit schema definition
const permitSchema = new mongoose.Schema({
    ntcPermitNo: { type: String, required: true, unique: true },    // National Transport Commission Permit Number
    busNo: { type: String, required: true },                       // Bus number (registration or identifier)
    origin: { type: String, required: true },                      // Origin of the permit route
    serviceType: { type: String, required: true },                 // Type of service (e.g., Express, Regular)
    registerDate: { type: Date, required: true },                  // Date the permit was registered
    validity: { type: Date, required: true },                      // Permit validity end date
    isValid: { type: Boolean, required: true },                    // Indicates if the permit is currently valid
    busOperator: { type: mongoose.Schema.Types.ObjectId, ref: "BusOperator", required: true }, // Foreign Key to BusOperator
    route: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },             // Foreign Key to Route
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },                 // Foreign Key to Bus
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Exporting the Permit model
module.exports = mongoose.model("Permit", permitSchema);