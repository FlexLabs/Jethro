var stripAnsi = require('strip-ansi');
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
    var sp = distance - stripAnsi(message).length;
    for (var j = 0; j < sp; j++) {
        message += ' ';
    }
    return message;
};

module.exports = Utilities;
