const express = require('express');
const {
    createBusOperator,
    getAllBusOperators,
    getBusOperatorById,
    updateBusOperatorById,
    deleteBusOperatorById,
    getBusOperatorByPhoneNumber,
    getBusOperatorByUserId,
} = require('../Services/busOperatorService'); // Adjust path as needed

const create = async (req, res) => {
    try {
        const result = await createBusOperator(req.body);
        return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const getAll = async (req, res) => {
    try {
        const result = await getAllBusOperators();
        return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const getById = async (req, res) => {
    try {
        const result = await getBusOperatorById(req.params.id);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const updateById = async (req, res) => {
    try {
        const result = await updateBusOperatorById(req.params.id, req.body);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const deleteById = async (req, res) => {
    try {
        const result = await deleteBusOperatorById(req.params.id);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const getByPhoneNumber = async (req, res) => {
    try {
        const result = await getBusOperatorByPhoneNumber(req.query.phoneNumber);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const getByUserId = async (req, res) => {
    try {
        const result = await getBusOperatorByUserId(req.query.userId);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

module.exports = {
    create,
    getAll,
    getById,
    updateById,
    deleteById,
    getByPhoneNumber,
    getByUserId,
};