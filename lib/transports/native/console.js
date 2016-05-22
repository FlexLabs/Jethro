var Transport = require('./../index.js');
var util = require('util');

/**
 * Constructor for the console transport
 * @constructor
 */
function JethroConsole() {
    Transport.call(this);
}

util.inherits(JethroConsole, Transport);

/**
 * Output function - logs to console
 * @param {object} data - Data packet to be logged to console
 * @param {string} data.severity
 * @param {string} data.source
 * @param {string} data.message
 * @param {Date|string} data.timestamp
 * @param {string} data.namespace
 * @param {string} data.location
 */
JethroConsole.prototype.output = function(data) {
    console.log(this.formatString(data));
};

module.exports = JethroConsole;