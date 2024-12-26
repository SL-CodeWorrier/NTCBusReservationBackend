const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const PORT = process.env.PORT || 7002;

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'NTC Bus Reservation API Documentation',
            version: '1.0.0',
            description: 'API documentation for Sri Lanka National Transport Council',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: [path.join(__dirname, './Routes/seatRoute.js')],
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;