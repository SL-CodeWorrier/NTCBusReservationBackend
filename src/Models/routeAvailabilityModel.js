// Required modules for schema creation
const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

// RouteAvailability schema definition
const routeAvailabilitySchema = new mongoose.Schema({
    isAvailable: { type: Boolean, required: true },             // Indicates if the route is currently available
    closedDateTime: { type: Date, required: false },            // When the route was closed (optional)
    openDateTime: { type: Date, required: false },              // When the route was reopened (optional)
    route: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true }, // Foreign Key to Route
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Exporting the RouteAvailability model
module.exports = mongoose.model("RouteAvailability", routeAvailabilitySchema);