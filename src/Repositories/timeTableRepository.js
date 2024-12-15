const TimeTable = require("../Models/timeTableModel");

// Retrieve timetables by Bus ID
const getByBusId = async (busId) => {
    try {
        const timetables = await TimeTable.find({ bus: busId }).populate("bus");
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

module.exports = {
    getByBusId,
};