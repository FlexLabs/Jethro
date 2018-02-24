'use strict';

const Jethro = require('../lib/index.js');
const logger = new Jethro();

console.log(logger.getSourceWhitelist('console'));
logger.clearSourceWhitelist();
