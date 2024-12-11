import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'To-Do Application API',
            version: '1.0.0',
            description: 'API documentation for the To-Do application',
        },
        servers: [
            {
                url: 'http://localhost:5000', // Replace with your server URL
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'], // Adjust the path to your route files
};

export const swaggerSpec = swaggerJSDoc(options);
