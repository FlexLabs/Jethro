var chalk = require("chalk");
var errors = require("./errors.json");

/**
 * Utilities
 * @constructor
 */
function Utilities() {}

Utilities.prototype.createError = function(error, type){
    error.code = type;
    error.message = errors[type].message;
    error.description = errors[type].description;
    return error;
};

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