var chalk = require("chalk");

/**
 * Utilities
 * @constructor
 */
function Utilities() {}

/**
 * @param message
 * @param distance
 * @returns {string}
 */
Utilities.prototype.spaceOut = function(message, distance) {
    var sp = distance - chalk.stripColor(message).length;
    for (var j = 0; j < sp; j++) {
        message += ' ';
    }
    return message;
};

module.exports = Utilities;