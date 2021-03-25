import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'YouSay API Docs',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
    },
  },
  apis: ['src/api/*/*.swagger.ts'],
};

const specs = swaggerJsdoc(options);

export default () => [
  swaggerUI.serve,
  swaggerUI.setup(specs)
];
