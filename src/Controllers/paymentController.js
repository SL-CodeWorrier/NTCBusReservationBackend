// Required modules
const Payment = require("../Models/payment");
const twilio = require("twilio");

const createPayment = async (req, res) => {
    try {
        const { paidDateTime, reservationId, amountForOneSeat, numberOfSeats, commuter } = req.body;

        // Calculate totalAmount if not provided
        const totalAmount = amountForOneSeat * numberOfSeats;

        // Find the commuter document to get the userId
        const commuterDoc = await Commuter.findById(commuter).populate("user");
        if (!commuterDoc) {
            return res.status(404).json({
                success: false,
                message: "Commuter not found.",
            });
        }

        // Retrieve the user's phone number using the user reference in commuter
        const userDoc = await User.findById(commuterDoc.user);
        if (!userDoc) {
            return res.status(404).json({
                success: false,
                message: "User associated with commuter not found.",
            });
        }

        const phoneNumber = userDoc.phonenumber;

        // Create a new payment document
        const payment = new Payment({
            paidDateTime,
            reservationId,
            amountForOneSeat,
            numberOfSeats,
            totalAmount,
            commuter,
        });

        const result = await payment.save();

        if(result)
        {
            // Twilio credentials
            const accountSid = 'your_account_sid';
            const authToken = 'your_auth_token';

            const client = twilio(accountSid, authToken);

            // Send SMS
            client.messages
            .create({
                body: `Your reservation is complete! Amount for one seat ${amountForOneSeat} x number of seats ${numberOfSeats} = total amount ${totalAmount}`,
                from: '+1234567890',
                to: phoneNumber,
            })
            .then((message) => {
                console.log('Message sent:', message.sid);
            })
            .catch((error) => {
                console.error('Error sending SMS:', error);
            });

        }

        return res.status(201).json({
            success: true,
            message: "Payment created successfully.",
            data: {
                payment: result,
                phoneNumber, // Include the phone number in the response
            },
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

        if(result)
        {
            // Twilio credentials
            const accountSid = 'your_account_sid';
            const authToken = 'your_auth_token';

            const client = twilio(accountSid, authToken);

            // Send SMS
            client.messages
            .create({
                body: `Your reservation is canceled! Amount for one seat ${amountForOneSeat} x number of seats ${numberOfSeats} = total amount ${totalAmount}`,
                from: '+1234567890',
                to: phoneNumber,
            })
            .then((message) => {
                console.log('Message sent:', message.sid);
            })
            .catch((error) => {
                console.error('Error sending SMS:', error);
            });

        }

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