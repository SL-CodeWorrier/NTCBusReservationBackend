// Required modules
const Payment = require("../Models/paymentModel");
const twilio = require("twilio");

const Ticket = require("../Models/ticketModel");
const Seat = require("../Models/seatModel");
const Bus = require("../Models/busModel");
const TimeTable = require("../Models/timeTable");
const Route = require("../Models/routeModel");
const Location = require("../Models/locationModel");
const Reservation = require("../Models/reservationModel");
const Commuter = require("../Models/commuterModel"); // Add this line
const User = require("../Models/userModel"); 

const createPayment = async (req, res) => {
    try {
        const { paidDateTime, reservationId, amountForOneSeat, commuter } = req.body;

        // Find the commuter document to get the userId
        const commuterDoc = await Commuter.findById(commuter).populate("user");
        if (!commuterDoc) {
            return res.status(404).json({
                success: false,
                message: "Commuter not found.",
            });
        }

        const currentReservation = await Reservation.findById(reservationId);
        const numberOfSeats = currentReservation.listOfSeats.length;

        // Calculate totalAmount if not provided
        const totalAmount = amountForOneSeat * numberOfSeats;

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

        if(result && reservationId !== null && reservationId !== undefined)
        {

            const seatIds = currentReservation.listOfSeats;
            console.log(seatIds);

            const tickets = [];
            for (const seatId of seatIds) {

                const seat = await Seat.findById(seatId);
                const bus = await Bus.findOne({ _id: seat.bus });
                const timeTable = await TimeTable.findOne({ bus: bus._id });
                const route = await Route.findOne({ _id: bus.route });

                const ticket = new Ticket({
                    price: amountForOneSeat,
                    seat: seat._id,
                    bus: bus._id,
                    timeTable: timeTable,
                    route: route._id,
                    reservation: reservationId,
                });

                console.log(ticket);

                tickets.push(ticket);
            }

            // Save all tickets to the database
            await Ticket.insertMany(tickets);

            console.log(`${tickets.length} tickets created successfully.`);
/*
            // Twilio credentials
            const accountSid = 'ACf666f979077bf5ab8061431197a62e0e';
            const authToken = '979753717cdc36a668dd4c4e961e80ef';
            const client = require('twilio')(accountSid, authToken);

            await client.messages
                .create({
                    body: `Your payment is complete! Number of seats: ${numberOfSeats} and Price for one seat: ${amountForOneSeat} | Total: Rs. ${totalAmount}`,
                    messagingServiceSid: 'MGb3d9b9603dce87f7d71879846d0edbb2',
                    to: '+94770251175'
                })
                .then(message => console.log("Twilio Message SID:", message.sid))
                .catch(error => {
                    console.error("Twilio Error:", error);
                    // Optional: handle notification failure differently if needed
                });
*/
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

const addReservationId = async (req, res) => {
    const { paymentId } = req.params;
    const { reservationId } = req.body;

    try {
        const updatedPayment = await Payment.findByIdAndUpdate(
            paymentId,
            { reservationId },
            { new: true, runValidators: true }
        );

        if(updatedPayment)
            {
                // Twilio credentials
                const accountSid = 'your_account_sid';
                const authToken = 'your_auth_token';
    
                const client = twilio(accountSid, authToken);

                const payment = await Payment.findById(paymentId);
    
                // Send SMS
                client.messages
                .create({
                    body: `Your reservation is complete! Amount for one seat ${payment.amountForOneSeat} x number of seats ${payment.numberOfSeats} = total amount ${payment.totalAmount}`,
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

        if (!updatedPayment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found for the given payment ID.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Reservation ID added to the payment successfully.",
            data: updatedPayment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `An error occurred: ${error.message}`,
        });
    }
};

// Exporting the updated functions
module.exports = {
    createPayment,
    deletePaymentsByCommuterId,
    getPaymentsByReservationId,
    getPaymentsByCommuterId,
    addReservationId,
};