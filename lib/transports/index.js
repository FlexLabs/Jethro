var uuid = require("uuid");
var util = require('util');
var chalk = require('chalk');
var moment = require("moment");

/**
 * @private
 * @type {chalk.constructor}
 */
var forceChalk = new chalk.constructor({
    enabled: true
});

/**
 * Transport constructor for output modules
 * @constructor
 * @property {uuid} id - ID for identifying transport
 * @property {?function} errorHandler - errorHandler callback placeholder
 * @property {Array} namespaces - Array for namespaces to listen to
 * @returns {Transport} Self
 */
function Transport() {
    this.id = uuid.v4();
    this.errorHandler = null;
    this.namespaces = [];

    /**
     * Setting object
     * @type {object}
     * @property {boolean} enabled - Boolean of whether the transport is active or not
     * @property {object} colour - Colour settings
     * @property {boolean} colour.enabled - Boolean of whether colour output is enabled
     * @property {boolean} colour.bold - Boolean for enabling bold output
     * @property {boolean} colour.force - Boolean for forcing colour output, even if not supported
     * @property {object} severity - Severity settings
     * @property {boolean} severity.debug - Boolean for allowing/disallowing debug severity output
     * @property {boolean} severity.transport - Boolean for allowing/disallowing transport severity output
     * @property {boolean} severity.info - Boolean for allowing/disallowing debug info output
     * @property {boolean} severity.success - Boolean for allowing/disallowing debug success output
     * @property {boolean} severity.warning - Boolean for allowing/disallowing debug warning output
     * @property {boolean} severity.error - Boolean for allowing/disallowing debug error output
     * @property {object} source - Source settings
     * @property {?string} source.enabled - String for whether source whitelist, blacklist or neither are enabled
     * @property {Array} source.whitelist - List of allowed sources to output through this transport
     * @property {Array} source.blacklist - List of disallowed sources not to output through this transport
     * @property {object} timestamp - Timestamp settings
     * @property {boolean} timestamp.enabled - Boolean of whether timestamp is part of the output string
     * @property {string} timestamp.format - Format moment.js should follow for the timestamp
     * @property {boolean} timestamp.utc - Boolean to force timestamp in UTC
     * @property {boolean} timestamp.brackets - Boolean to wrap timestamp in brackets
     * @property {object} location - Location settings
     * @property {boolean} location.enabled - Boolean of whether to display location or not
     * @private
     */
    this._settings = {
        "enabled": true,
        "colour": {
            "bold": true,
            "enabled": true,
            "force": false
        },
        "severity": {
            "debug": true,
            "transport": true,
            "info": true,
            "success": true,
            "warning": true,
            "error": true
        },
        "source": {
            "enabled": null,
            "whitelist": [],
            "blacklist": []
        },
        "timestamp": {
            "enabled": true,
            "format": "HH:mm:ss[s] SSS[ms]",
            "utc": false,
            "brackets": false
        },
        "location": {
            "enabled": false
        }
    };
    return this;
}

/* Public */

// Enable/Disable transport
/**
 * Disables the current transport
 * @returns {Transport} Self
 */
Transport.prototype.disable = function() {
    this._settings.enabled = false;
    return this;
};

/**
 * Enables the current Transport
 * @returns {Transport} Self
 */
Transport.prototype.enable = function() {
    this._settings.enabled = true;
    return this;
};

/**
 * Returns whether this transport is enabled
 * @returns {boolean} Boolean of the transport's enabled state
 */
Transport.prototype.enabled = function() {
    return this._settings.enabled;
};

/**
 * Returns whether this transport is disabled
 * @returns {boolean} Boolean of the transport's disabled state
 */
Transport.prototype.disabled = function() {
    return !this._settings.enabled;
};


// Colour
/**
 * Disables the colour setting for this transport
 * @returns {Transport} Self
 */
Transport.prototype.disableColor = Transport.prototype.disableColour = function() {
    this._settings.colour.enabled = false;
    return this;
};

/**
 * Enables the colour setting for this transport
 * @returns {Transport} Self
 */
Transport.prototype.enableColor = Transport.prototype.enableColour = function() {
    this._settings.colour.enabled = true;
    return this;
};

/**
 * Returns the colour setting object for this transport
 * @returns {object} Colour settings object
 */
Transport.prototype.getColorSettings = Transport.prototype.getColourSettings = function() {
    return this._settings.colour;
};

/**
 * Disables the force colour option for this transport
 * @returns {Transport} Self
 */
Transport.prototype.disableForceColour = function() {
    this._settings.colour.force = false;
    return this;
};

/**
 * Enables the force colour option for this transport
 * @returns {Transport} Self
 */
Transport.prototype.enableForceColour = function() {
    this._settings.colour.force = true;
    return this;
};

/**
 * Disables the bold colour option for this transport
 * @returns {Transport} Self
 */
Transport.prototype.disableBoldColour = function() {
    this._settings.colour.bold = false;
    return this;
};

/**
 * Enables the bold colour option for this transport
 * @returns {Transport} Self
 */
Transport.prototype.enableBoldColour = function() {
    this._settings.colour.bold = true;
    return this;
};


// Whitelist
/**
 * Adds the specified string to the source whitelist for this transport
 * @param {string} str - Value to add to whitelist
 * @returns {Transport} Self
 */
Transport.prototype.addToWhitelist = function(str) {
    if (typeof str !== "undefined" && this._settings.source.whitelist.indexOf(str) === -1) {
        this._settings.source.whitelist.push(str);
    } return this;
};

/**
 * Removes the specified string from the source whitelist for this transport
 * @param {string} str - Value remove from whitelist
 * @returns {Transport} Self
 */
Transport.prototype.removeFromWhitelist = function(str) {
    var index = this._settings.source.whitelist.indexOf(str);
    if (index > -1) {
        this._settings.source.whitelist.splice(index, 1);
    } return this;
};

/**
 * Returns the whitelist array for this transport
 * @returns {Array} Whitelist
 */
Transport.prototype.getWhitelist = function() {
    return this._settings.source.whitelist;
};

/**
 * Clears the whitelist for this transport
 * @returns {Transport} Self
 */
Transport.prototype.clearWhitelist = function() {
    this._settings.source.whitelist = [];
    return this;
};


// Blacklist
/**
 * Adds the specified string to the source blacklist for this transport
 * @param {string} str - Value to add to blacklist
 * @returns {Transport} Self
 */
Transport.prototype.addToBlacklist = function(str) {
    if (this._settings.source.blacklist.indexOf(str) === -1) {
        this._settings.source.blacklist.push(str);
    } return this;
};

/**
 * Removes the specified string from the source blacklist for this transport
 * @param {string} str - Value to remove from blacklist
 * @returns {Transport} Self
 */
Transport.prototype.removeFromBlacklist = function(str) {
    var index = this._settings.source.blacklist.indexOf(str);
    if (index > -1) {
        this._settings.source.blacklist.splice(index, 1);
    } return this;
};

/**
 * Returns the blacklist array for this transport
 * @returns {Array} Whitelist
 */
Transport.prototype.getBlacklist = function() {
    return this._settings.source.Blacklist;
};

/**
 * Clears the blacklist for this transport
 * @returns {Transport} Self
 */
Transport.prototype.clearBlacklist = function() {
    this._settings.source.blacklist = [];
    return this;
};


// Log Level
/**
 * Sets the log level, or allow/ignore value of a specific level for this transport
 * @param str {string} - Name of the severity to be acted upon
 * @param  [value] {boolean} - Value of the severity to be set to
 * @returns {Transport} Self
 */
Transport.prototype.setLogLevel = function(str, value) {
    //TODO: Fix behaviour
    if (typeof str !== "undefined" && value !== "undefined") {
        if (value === true || value === false) {
            var s = this._settings.severity;
            if (s.indexOf(str) > -1) {
                s[str] = value;
                return this;
            } else {
                throw new Error("Severity not found in settings");
            }
        } else {
            throw new Error("Second argument must be true or false");
        }
    } else {
        throw new Error("Invalid arguments");
    }
};


// Timestamp
/**
 * Enables the timestamp setting for this transport
 * @returns {Transport} Self
 */
Transport.prototype.enableTimestamp = function() {
    this._settings.timestamp.enabled = true;
    return this;
};

/**
 * Disables the timestamp setting for this transport
 * @returns {Transport} Self
 */
Transport.prototype.disableTimestamp = function() {
    this._settings.timestamp.enabled = false;
    return this;
};

/**
 * Enables the brackets on the timestamp for this transport
 * @returns {Transport} - Returning self for chaining purposes
 */
Transport.prototype.enableBrackets = function() {
    this._settings.timestamp.brackets = true;
    return this;
};


/**
 * Disables the brackets on the timestamp for this transport
 * @returns {Transport} Self
 */
Transport.prototype.disableBrackets = function() {
    this._settings.timestamp.brackets = false;
    return this;
};

/**
 * Sets the format for moment.js timestamp string for this transport
 * @param str {string} - The new format value of the timestamp
 * @returns {Transport} Self
 */
Transport.prototype.setTimestampFormat = function(str) {
    if (typeof str === "string") {
        this._settings.timestamp.format = str;
        return this;
    } else {
        throw new Error("Argument not a string");
    }
};

/**
 * Resets the timestamp format to the default value for this transport
 * @returns {Transport} Self
 */
Transport.prototype.resetTimestampFormat = function() {
    this._settings.timestamp.format = "HH:mm:ss[s] SSS[ms]";
    return this;
};

/**
 * Enables the UTC setting for this transport
 * @returns {Transport} Self
 */
Transport.prototype.enableUTC = function() {
    this._settings.timestamp.utc = true;
    return this;
};

/**
 * Disables the UTC setting ofor this transport
 * @returns {Transport} Self
 */
Transport.prototype.disableUTC = function() {
    this._settings.timestamp.utc = false;
    return this;
};


// Location

/**
 * Enables the location for this transport
 * @returns {Transport} Self
 */
Transport.prototype.enableLocation = function() {
    this._settings.location.enabled = true;
    return this;
};

/**
 * Disables the location for this transport
 * @returns {Transport} Self
 */
Transport.prototype.disableLocation = function() {
    this._settings.location.enabled = false;
    return this;
};

/**
 * Function to capitalise the first letter of a string
 * @private
 * @param {string} str;
 * @returns {string}
 */
Transport.prototype.capitalise = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Format location string
 * @private
 * @param data
 * @returns {string}
 */
Transport.prototype.getLocation = function(data){
    return "[" + data.location + "]";
};

/**
 * Formats the message variable
 * @private
 * @param data
 * @returns {string} Message
 */
Transport.prototype.getMessage = function(data) {
    if (typeof data.message === "string") {
        return data.message;
    } else {
        return util.inspect(data.message);
    }
};

/**
 * Formats the severity string
 * @private
 * @param data
 * @returns {string} Severity
 */
Transport.prototype.getSeverity = function(data) {
    var severity;
    if (typeof data.severity !== "undefined") {
        severity = this._settings.colour.enabled === true
            ?  "[" + this.getSeverityColour(this.capitalise(data.severity)) + "]"
            :  "[" + this.capitalise(data.severity) + "]";
    } else {
        severity = "[undefined]";
    }
    return severity;
};

/**
 * Colourises the severity string according to its value
 * @private
 * @param s
 * @returns {*}
 */
Transport.prototype.getSeverityColour = function(s) {
    switch (s.toLowerCase()) {
        case 'success':
            return this._settings.colour.force ? forceChalk.green.bold(s) : chalk.green.bold(s);
        case 'transport':
            return this._settings.colour.force ? forceChalk.cyan.bold(s) : chalk.cyan.bold(s);
        case 'debug':
            return this._settings.colour.force ? forceChalk.blue.bold(s) : chalk.blue.bold(s);
        case 'info':
            return this._settings.colour.force ? forceChalk.magenta.bold(s) : chalk.magenta.bold(s);
        case 'warning':
            return this._settings.colour.force ? forceChalk.yellow.bold(s) : chalk.yellow.bold(s);
        case 'error':
            return this._settings.colour.force ? forceChalk.red.bold(s) : chalk.red.bold(s);
        default:
            return s;
    }
};

/**
 * Formats the source
 * @private
 * @param data
 * @returns {*}
 */
Transport.prototype.getSource = function(data) {
    var source;
    if (typeof data.source !== "undefined") {
        source = "[" + data.source + "]";
    } else {
        source = "[undefined]";
    } return source;
};

/**
 * @private
 * @param data
 * @returns {*}
 */
Transport.prototype.getTimestamp = function(data) {
    var date = data.timestamp || new Date();
    var f = this._settings.timestamp.utc
        ? moment(date.toISOString()).utc().format(this._settings.timestamp.format)
        : moment(date.toISOString()).format(this._settings.timestamp.format);
    if (this._settings.timestamp.brackets === true) {
        return "[" + f + "]";
    } else {
        return f;
    }
};

/**
 * Formats the string according to
 * @private
 * @param data
 * @returns {*}
 */
Transport.prototype.formatString = function(data) {
    if (typeof data === "object") {
        var timestamp = this._settings.timestamp.enabled === true ? this.getTimestamp(data) : "";
        var severity = this.spaceOut(this.getSeverity(data), 12);
        var location = this._settings.location.enabled === true ? this.spaceOut(this.getLocation(data), 20) : "";
        var source = this.spaceOut(this.getSource(data), 15);
        var message = this.getMessage(data);
        var output = (timestamp + " " + severity + " " + location + " " + source + " " + message);
        if (this._settings.colour.enabled === false) {
            output = chalk.stripColor(output);
        } return output;
    } else {
        throw new Error("A non-object was sent to the Logger.output() function! See: " + util.inspect(data));
    }
};

/**
 * @private
 * @param message
 * @param distance
 * @returns {*}
 */
Transport.prototype.spaceOut = function(message, distance) {
    var sp = distance - chalk.stripColor(message).length;
    for (var j = 0; j < sp; j++) {
        message += ' ';
    }
    return message;
};


/**
 * Internal
 * @param data
 * @private
 */
Transport.prototype._input = function(data) {
    if (
        typeof data !== "undefined" &&
        typeof data.severity !== "undefined" &&
        typeof data.source !== "undefined" &&
        typeof data.message!== "undefined" &&
        typeof data.timestamp!== "undefined" &&
        typeof data.namespace !== "undefined"
    ) {
        if (typeof this.output === "function") {
            if (this.namespaces.length === 0 ||
                this.namespaces.indexOf(data.namespace) > -1
            ) { if ((this._settings.source.enabled === null
                    ) || (
                        this._settings.source.enabled === "whitelist" &&
                        this._settings.source.whitelist.indexOf(data.source) > -1
                    ) || (
                        this._settings.source.enabled === "blacklist" &&
                        this._settings.source.blacklist.indexOf(data.source) > -1)
                ) {
                    this.output(data);
                }
            }
        } else {
            throw new Error("No output prototype found for transport");
        }
    } else {
        throw new Error("Missing parameters!");
    }
};

/**
 * Output function to be overwritten
 * @param data
 */
Transport.prototype.output = function(data){
    throw new Error("Output function not overwritten!");
};

/**
 * Internal error handling function, sets callback to the errorHandler property
 * @param callback
 * @private
 */
Transport.prototype.onError = function(callback) {
    this.errorHandler = callback;
};

module.exports = Transport;