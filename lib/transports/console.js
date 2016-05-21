var Transport = require('./index.js');
var util = require('util');

/**
 * Constructor for the console transport
 * @constructor
 */
function JethroConsole() {}

util.inherits(JethroConsole, Transport);

JethroConsole.prototype.output = function(data) {
    console.log(this.formatString(data));
};

module.exports = JethroConsole;