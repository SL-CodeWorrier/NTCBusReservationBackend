const dbConnect = require("../config/applicationDbContext");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

dbConnect();

const registerUser = async ({phonenumber, username, password, role }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ 
            phonenumber,
            username, 
            password: hashedPassword, 
            role 
        });

        await newUser.save();
        return { success: true, message: 'User registered successfully!', data: phonenumber };

    } catch (error) {
        console.error('Error during user registration:', error);
        return { success: false, message: 'User registration failed!', data: phonenumber };
    }
};

const loginUser = async ({ credential, password }) => {
    try {
        const user = await User.findOne({
            $or: [{ username: credential }, { phonenumber: credential }],
        });

        if (!user) {
            return { success: false, message: 'User not found!', data: credential };
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            const token = jwt.sign({ id: user._id, credential: user.phonenumber, role: user.role},
                process.env.JWT_SECURITY, {expiresIn: "1h"});
            return { success: false, message: 'User logged in successfully!', data: token };
        }else{
            return { success: true, message: 'Invalid password!', data: credential };
        }

    } catch (error) {
        console.error('Error during user login:', error);
        return { success: false, message: 'User login failed!', data: credential };
    }
};


module.exports = { registerUser, loginUser };