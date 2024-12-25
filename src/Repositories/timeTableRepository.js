const TimeTable = require("../Models/timeTable");

// Retrieve timetables by Bus ID
const getByBusId = async (busId) => {
    try {
        const timetables = await TimeTable.find({ bus: busId }).populate("bus location");
        if (!timetables || timetables.length === 0) {
            return {
                success: false,
                message: "No timetables found for the specified Bus ID",
            };
        }
        return {
            success: true,
            message: "Timetables retrieved successfully",
            data: timetables,
        };
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve timetables: ${error.message}`,
        };
    }
};


// Function to create a timetable entry for a specific bus
const createTimeTable = async (arrivalTime, departureTime, busId, locationId) => {
    try {
        // Create a new TimeTable entry
        const newTimeTable = new TimeTable({
            arrivalTime,
            departureTime,
            bus: busId,          // Assuming busId is the ObjectId of an existing Bus document
            location: locationId // Assuming locationId is the ObjectId of an existing Location document
        });

        // Save the new TimeTable entry to the database
        const savedTimeTable = await newTimeTable.save();

        return {
            success: true,
            message: "Timetables created successfully",
            data: savedTimeTable,
        };
    } catch (error) {
        console.error("Error creating TimeTable:", error);
        return {
            success: false,
            message: "Error creating TimeTable",
            data: null,
        };
    }
};

module.exports = {
    getByBusId,
    createTimeTable,
};