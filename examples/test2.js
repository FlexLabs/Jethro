var Jethro = require('../lib/index.js');
var path = require("path");
var logger = new Jethro();


console.log(logger.getSourceWhitelist("console"));
logger.clearSourceWhitelist();