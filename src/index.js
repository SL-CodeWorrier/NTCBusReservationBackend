const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/applicationDbContext");

const authRoutes = require("./Routes/authRoute");
const commuterRoutes = require("./Routes/commuterRoute");

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

const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});