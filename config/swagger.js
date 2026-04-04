const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
  openapi: "3.0.0",
  info: {
    title: "Finance Dashboard API",
    description: "API documentation for Finance Dashboard Backend. Use Authorize button to add JWT token (Bearer TOKEN) after logging in  .",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:5000",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
},

  // scan these files for swagger comments
  apis: ["./docs/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;