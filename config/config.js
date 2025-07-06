require('ts-node/register'); // Enables loading .ts files
const config = require('../src/database/config/config.ts').default;
module.exports = config;
