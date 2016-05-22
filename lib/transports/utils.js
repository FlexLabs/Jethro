var util = require('util');
var chalk = require('chalk');
var moment = require("moment");

/**
 * Function to capitalise the first letter of a string
 * @memberof Transport
 * @param string
 * @returns {string}
 */
function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var forceChalk = new chalk.constructor({
    enabled: true
});

/**
 * Formats the string according to
 * @memberof Transport
 * @param data
 * @returns {*}
 */
function formatString(data) {
    if (typeof data === "object") {
        var timestamp = this.getTimestamp(data);
        var severity = this.getSeverity(data);
        var source = this.getSource(data);
        var message = this.getMessage(data);
        var output = (timestamp + severity + source + message);
        if (this._settings.colour.enabled === false) {
            output = chalk.stripColor(output);
        } return output;
    } else {
        throw new Error("A non-object was sent to the Logger.output() function! See: " + util.inspect(data));
    }
}

/**
 * Formats the message variable
 * @memberof Transport
 * @param data
 * @returns {string} Message
 */
function getMessage(data) {
    if (typeof data.message === "string") {
        return data.message;
    } else {
        return util.inspect(data.message);
    }
}

/**
 * Formats the severity string
 * @memberof Transport
 * @param data
 * @returns {string} Severity
 */
function getSeverity(data) {
    var severity;
    if (typeof data.severity !== "undefined") {
        severity = "[" + this.getSeverityColour(this.capitalise(data.severity)) + "]";
    } else {
        severity = "[undefined]";
    }
    return spaceOut(severity, 12);
}

/**
 * Colourises the severity string according to its value
 * @memberof Transport
 * @param s
 * @returns {*}
 */
function getSeverityColour(s) {
    var settings = this._settings;
    if (settings.colour.enabled) {
        switch (s.toLowerCase()) {
            case 'success':
                return settings.colour.force ? forceChalk.green.bold(s) : chalk.green.bold(s);
            case 'transport':
                return settings.colour.force ? forceChalk.cyan.bold(s) : chalk.cyan.bold(s);
            case 'debug':
                return settings.colour.force ? forceChalk.blue.bold(s) : chalk.blue.bold(s);
            case 'info':
                return settings.colour.force ? forceChalk.magenta.bold(s) : chalk.magenta.bold(s);
            case 'warning':
                return settings.colour.force ? forceChalk.yellow.bold(s) : chalk.yellow.bold(s);
            case 'error':
                return settings.colour.force ? forceChalk.red.bold(s) : chalk.red.bold(s);
            default:
                return s;
        }
    } else {
        return s;
    }
}

/**
 * Formats the source
 * @memberof Transport
 * @param data
 * @returns {*}
 */
function getSource(data) {
    var source;
    if (typeof data.source !== "undefined") {
        source = "[" + data.source + "]";
    } else {
        source = "[undefined]";
    } return spaceOut(source, 15);
}

/**
 * @memberof Transport
 * @param data
 * @returns {*}
 */
function getTimestamp(data) {
    var settings = this._settings;
    var f = "";
    if (settings.timestamp.enabled === true) {
        var date = data.timestamp || new Date();
        f = settings.timestamp.utc
            ? moment(date.toISOString()).utc().format(settings.timestamp.format)
            : moment(date.toISOString()).format(settings.timestamp.format);
        if (settings.timestamp.brackets === true) {
            return "[" + f + "] ";
        } else {
            return f + " ";
        }
    } else {
        return f;
    }
}

/**
 * @memberof Transport
 * @param message
 * @param distance
 * @returns {*}
 */
function spaceOut(message, distance) {
    var sp = distance - chalk.stripColor(message).length;
    for (var j = 0; j < sp; j++) {
        message += ' ';
    }
    return message;
}

module.exports.capitalise = capitalise;
module.exports.getMessage = getMessage;
module.exports.getSeverity = getSeverity;
module.exports.getSeverityColour = getSeverityColour;
module.exports.getSource = getSource;
module.exports.getTimestamp = getTimestamp;
module.exports.formatString = formatString;
module.exports.spaceOut = spaceOut;