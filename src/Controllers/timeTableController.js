const express = require("express");
const router = express.Router();
const { getByBusId, createTimeTable } = require("../Repositories/timeTableRepository");

// Controller to handle GET request for timetables by Bus ID
const getTimetablesByBusId = async (req, res) => {
    const { busId } = req.params;

    try {
        const result = await getByBusId(busId);

        if (result.success) {
            return res.status(200).json({
                success: true,
                message: result.message,
                data: result.data,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: result.message,
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `An error occurred: ${error.message}`,
        });
    }
};

const AddTimeForBus = async (req, res) => {
    const { arrivalTime, departureTime, busId, locationId } = req.body;

    // Check if all required fields are provided
    if (!arrivalTime || !departureTime || !busId || !locationId) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields: arrivalTime, departureTime, busId, locationId',
        });
    }

    try {
        // Call the createTimeTable function
        const result = await createTimeTable(arrivalTime, departureTime, busId, locationId);

        if (result.success) {
            // Return success response with created timetable data
            return res.status(201).json({
                success: true,
                message: result.message,
                data: result.data,
            });
        } else {
            // Return error response
            return res.status(500).json({
                success: false,
                message: result.message,
                data: result.data,
            });
        }
    } catch (error) {
        console.error('Error in creating TimeTable:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while creating the TimeTable.',
            data: null,
        });
    }
};

module.exports = {
    getTimetablesByBusId,
    AddTimeForBus
};