const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

const {registerUser, loginUser} = require('../Repositories/userRepository');

const register = async (req, res) => {
    try {
        const { phonenumber, username, password, role } = req.body;
        const result = await registerUser({ phonenumber, username, password, role });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const login = async (req, res) => {
    const { credential, password } = req.body;

    const result = await loginUser({ credential, password });

    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(401).json(result);
    }
};

const verify = async (req, res) => {
    const { phonenumber } = req.body;

    try {
        const result = await verifyByPhoneNumber(phonenumber);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const forgot = async (req, res) => {
    const { phonenumber } = req.body;

    try {
        const result = await forgotPassword(phonenumber);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const reset = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const result = await resetPassword({ token, newPassword });

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { updates } = req.body;

    try {
        const result = await updateUser({ id, updates });

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await deleteUser(id);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    register,
    login,
    verify,
    forgot,
    reset,
    update,
    remove
};