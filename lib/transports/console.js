var Transport = require('./index.js');
var util = require('util');

function JethroConsole(){}

util.inherits(JethroConsole, Transport);

JethroConsole.prototype.input = function(data) {
    console.log(this.formatString(data));
};

module.exports = JethroConsole;