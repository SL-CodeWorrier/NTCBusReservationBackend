const express = require('express');
const {
    createCommuter,
    getAllCommuters,
    getCommuterById,
    updateCommuterById,
    deleteCommuterById,
    getCommutersByProvince,
    getCommutersByCity,
    getCommuterByPhoneNumberOrEmail,
} = require('../Repositories/commuterRepository');

const create = async (req, res) => {
    try {
        const result = await createCommuter(req.body);
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
        const result = await getAllCommuters();
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
        const result = await getCommuterById(req.params.id);
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
        const result = await updateCommuterById(req.params.id, req.body);
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
        const result = await deleteCommuterById(req.params.id);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const getByProvince = async (req, res) => {
    try {
        const result = await getCommutersByProvince(req.query.province);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const getByCity = async (req, res) => {
    try {
        const result = await getCommutersByCity(req.query.city);
        return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
            error: error.message,
        });
    }
};

const getByPhoneNumberOrEmail = async (req, res) => {
    try {
        const result = await getCommuterByPhoneNumberOrEmail(req.query.credential);
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
    getByProvince,
    getByCity,
    getByPhoneNumberOrEmail,
};