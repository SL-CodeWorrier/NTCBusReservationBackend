// Required modules
const Payment = require("../Models/payment");

// Create a new payment
const createPayment = async (req, res) => {
    try {
        const { paidDateTime, reservationId, amountForOneSeat, numberOfSeats, commuter } = req.body;

        // Calculate totalAmount if not provided
        const totalAmount = amountForOneSeat * numberOfSeats;

        const payment = new Payment({
            paidDateTime,
            reservationId,
            amountForOneSeat,
            numberOfSeats,
            totalAmount,
            commuter,
        });

        const result = await payment.save();
        return res.status(201).json({
            success: true,
            message: "Payment created successfully.",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `An error occurred: ${error.message}`,
        });
    }
};

// Delete payments by commuter ID
const deletePaymentsByCommuterId = async (req, res) => {
    const { commuterId } = req.params;

    try {
        const result = await Payment.deleteMany({ commuter: commuterId });

        if (result.deletedCount > 0) {
            return res.status(200).json({
                success: true,
                message: `${result.deletedCount} payment(s) deleted successfully.`,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No payments found for the given commuter ID.",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `An error occurred: ${error.message}`,
        });
    }
};

// Get payments by reservation ID
const getPaymentsByReservationId = async (req, res) => {
    const { reservationId } = req.params;

    try {
        const payments = await Payment.find({ reservationId }).populate("reservationId");

        if (payments.length > 0) {
            return res.status(200).json({
                success: true,
                data: payments,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No payments found for the given reservation ID.",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `An error occurred: ${error.message}`,
        });
    }
};

// Get payments by commuter ID
const getPaymentsByCommuterId = async (req, res) => {
    const { commuterId } = req.params;

    try {
        const payments = await Payment.find({ commuter: commuterId }).populate("commuter");

        if (payments.length > 0) {
            return res.status(200).json({
                success: true,
                data: payments,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No payments found for the given commuter ID.",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `An error occurred: ${error.message}`,
        });
    }
};

// Exporting the functions
module.exports = {
    createPayment,
    deletePaymentsByCommuterId,
    getPaymentsByReservationId,
    getPaymentsByCommuterId,
};