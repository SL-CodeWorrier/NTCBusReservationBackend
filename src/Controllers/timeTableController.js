const express = require("express");
const router = express.Router();
const { getByBusId } = require("../Repositories/timeTableRepository");

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


module.exports = router;