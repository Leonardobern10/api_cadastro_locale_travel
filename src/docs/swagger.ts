import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
      definition: {
            openapi: '3.0.0',
            info: {
                  title: 'API LocaleTravel',
                  version: '1.0.0',
                  description: 'Documentação da API de cadastro de clientes com Swagger'
            },
            servers: [
                  {
                        url: `http://localhost:${process.env.PORT}`
                  }
            ]
      },
      apis: ['./src/routes/*.ts']
}

export const swaggerSpec = swaggerJsdoc(options);