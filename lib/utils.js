var chalk = require("chalk");
var errors = require("./errors.json");

/**
 * Utilities
 * @constructor
 */
function Utilities() {}

Utilities.prototype.createError = function(error, type, custom){
    error.code = type;
    if (typeof errors[type] !== "undefined") {
        error.message = errors[type].message;
        error.description = errors[type].description;
    } else {
        error.message = custom.message;
        error.description = error.descripion;
    } return error;
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