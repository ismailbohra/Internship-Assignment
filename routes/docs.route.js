const express = require('express');
const swaggerUi = require('swagger-ui-express');

const path = require('path');
const YAML = require('yamljs');
const swaggerJSDocs = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));

const router = express.Router();

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerJSDocs));

module.exports = router;
