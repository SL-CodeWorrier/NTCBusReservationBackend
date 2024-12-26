// Required modules for schema creation
const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

// Route schema definition
const routeSchema = new mongoose.Schema({
    origin: { type: String, required: true },          // Starting point of the route
    destination: { type: String, required: true },     // Ending point of the route
    routeNumber: { type: String, required: true, unique: true }, // Unique identifier for the route
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Exporting the Route model
module.exports = mongoose.model("Route", routeSchema);