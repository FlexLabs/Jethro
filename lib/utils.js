'use strict';

const stripAnsi = require('strip-ansi');
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
    const sp = distance - stripAnsi(message).length;
    for (let j = 0; j < sp; j++) {
        message += ' ';
    }
    return message;
};

module.exports = Utilities;
