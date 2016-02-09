"use strict";

var chalk = require("chalk");

module.exports = chalk;
module.exports.debug = chalk.blue.bold;
module.exports.error = chalk.red.bold;
module.exports.info = chalk.magenta.bold;
module.exports.success = chalk.green.bold.italic;
module.exports.transport = chalk.cyan.bold;
module.exports.warning = chalk.yellow.bold;
