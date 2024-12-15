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


  
module.exports = {
    register,
    login
};