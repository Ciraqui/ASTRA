const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Exemplo com Swagger',
      version: '1.0.0',
      description: 'Api de exemplo de documentação do Swagger'
    },
    servers: [
      {
        url: 'http://localhost:3000/api'
      }
    ]
  },
  apis: ['./src/routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;