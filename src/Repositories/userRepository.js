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
            return { success: true, message: 'User logged in successfully!', data: token };
        }else{
            return { success: false, message: 'Invalid password!', data: credential };
        }

    } catch (error) {
        console.error('Error during user login:', error);
        return { success: false, message: 'User login failed!', data: credential };
    }
};

const verifyByPhoneNumber = async (phonenumber) => {
    try {
        const user = await User.findOne({ phonenumber });

        if (!user) {
            return { success: false, message: "User not found!", data: phonenumber };
        }

        if (user.isVerified) {
            return { success: false, message: "User already verified!", data: phonenumber };
        }

        user.isVerified = true;
        await user.save();

        return { success: true, message: "User verified successfully!", data: phonenumber };
    } catch (error) {
        console.error("Error during user verification:", error);
        return { success: false, message: "User verification failed!", data: phonenumber };
    }
};

const forgotPassword = async (phonenumber) => {
    try {
        const user = await User.findOne({ phonenumber });

        if (!user) {
            return { success: false, message: "User not found!", data: phonenumber };
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECURITY, { expiresIn: "15m" });

        // TODO: Send token to user via SMS or email (depends on your implementation).

        return { success: true, message: "Password reset token generated!", data: token };
    } catch (error) {
        console.error("Error during forgot password:", error);
        return { success: false, message: "Password reset process failed!", data: phonenumber };
    }
};

const resetPassword = async ({ token, newPassword }) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECURITY);

        const user = await User.findById(decoded.id);

        if (!user) {
            return { success: false, message: "Invalid or expired token!", data: false };
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return { success: true, message: "Password reset successfully!", data: true};
    } catch (error) {
        console.error("Error during password reset:", error.message);  // improved error logging
        return { success: false, message: "Password reset failed!", data: false };
    }
};

const updateUser = async ({ id, updates }) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedUser) {
            return { success: false, message: "User not found!", data: id };
        }

        return { success: true, message: "User updated successfully!", data: updatedUser };
    } catch (error) {
        console.error("Error during user update:", error);
        return { success: false, message: "User update failed!", data: id };
    }
};

const deleteUser = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return { success: false, message: "User not found!", data: id };
        }

        return { success: true, message: "User deleted successfully!", data: id };
    } catch (error) {
        console.error("Error during user deletion:", error);
        return { success: false, message: "User deletion failed!", data: id };
    }
};

module.exports = {
    registerUser,
    loginUser,
    verifyByPhoneNumber,
    forgotPassword,
    resetPassword,
    updateUser,
    deleteUser,
};