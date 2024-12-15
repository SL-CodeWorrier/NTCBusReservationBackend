const express = require('express');
const { getAllRouteAvailabilities } = require('../Repositories/routeAvailabilityRepository');

/**
 * Controller to retrieve all route availabilities.
 * If ⁠ isAvailable ⁠ query parameter is provided, it filters the results accordingly.
 */
const getAll = async (req, res) => {
    try {
        // Extract the isAvailable parameter from the query string
        const isAvailable = req.query.isAvailable === undefined ? null : req.query.isAvailable === 'true';

        // Call the service function to fetch route availabilities
        const result = await getAllRouteAvailabilities(isAvailable);

        // Respond with appropriate status and data
        return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        // Handle unexpected errors
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

module.exports = {
    getAll,
};