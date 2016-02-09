var chalk = require('./chalk.js');

module.exports = function(message, distance) {
    var sp = distance - chalk.stripColor(message).length;
    for (var j = 0; j < sp; j++) {
        message += ' ';
    }
    return message;
};
