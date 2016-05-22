var Transport = require('./../index.js');
var util = require('util');

/**
 * Constructor for the console transport
 * @constructor
 * @augments Transport
 */
function JethroConsole() {
    Transport.call(this);
}

util.inherits(JethroConsole, Transport);

/**
 * Output function - logs to console
 * @param {object} data - Data packet to be logged to console
 * @param {string} data.severity - Severity of the log
 * @param {string} data.source - Source of the log
 * @param {string} data.message - Log content
 * @param {Date|string} data.timestamp - Timestamp of the log
 * @param {string} data.namespace - Namespace to broadcast as
 * @param {string} data.location - Location of the application
 */
JethroConsole.prototype.output = function(data) {
    console.log(this.formatString(data));
};

module.exports = JethroConsole;