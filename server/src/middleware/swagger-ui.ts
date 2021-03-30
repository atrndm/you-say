import swaggerUI from 'swagger-ui-express';
import yaml, { JSON_SCHEMA } from 'js-yaml';
import fs from 'fs';
import path from 'path';

const yamlDocument = fs.readFileSync(path.resolve(__dirname, '../../swagger.yml'), 'utf-8');
const swaggerDocument = yaml.load(yamlDocument, { json: true, schema: JSON_SCHEMA }) as object;

export default () => [
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument)
];
