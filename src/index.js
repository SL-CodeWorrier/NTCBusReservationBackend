const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/applicationDbContext");

const authRoutes = require("./Routes/authRoute");
const commuterRoutes = require("./Routes/commuterRoute");
const busOperatorRoutes = require("./Routes/busOperatorRoute");
const routeRoutes = require("./Routes/routeRoute");
const routeAvailabilityRoutes = require('./Routes/routeAvailabilityRoute');
const busRoutes = require('./Routes/busRoute');
const permitRoutes = require('./Routes/permitRoute');
const timeTableRoutes = require('./Routes/timeTableRoute');
const seatRoutes = require('./Routes/seatRoute');

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger'); // Import Swagger configuration

dbConnect();

const app = express();

app.use(express.json());

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api/v1/lk/auth", authRoutes);
app.use("/api/v1/lk/commuter", commuterRoutes);
app.use("/api/v1/lk/bus-operators", busOperatorRoutes);
app.use("/api/v1/lk/routes", routeRoutes);
app.use("/api/v1/lk/routes-availability", routeAvailabilityRoutes);
app.use("/api/v1/lk/permits", permitRoutes);
app.use("/api/v1/lk/time-table", timeTableRoutes);
app.use("/api/v1/lk/seat", seatRoutes);
app.use("/api/v1/lk/reservation", seatRoutes);

const PORT = process.env.PORT || 7002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});