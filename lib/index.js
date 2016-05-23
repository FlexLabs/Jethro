var os = require("os");
var util = require("util");
var uuid = require("uuid");
var EventEmitter = require("eventemitter3");

//Transports
var Transport = require('./transports/index.js');
var JethroConsole = require('./transports/native/console.js');
var JethroFile = require('./transports/native/file.js');

/**
 * Module entry point, default logging function
 * @param {string} severity - Describes the severity of the log
 * @param {string} source - Declares the source of the log
 * @param {string} message - The message of the log
 * @param {string} [timestamp] - The timestamp of the message, if not provided, new Date();
 */
function log(severity, source, message, timestamp) {
    if (!(this instanceof Jethro)) {
        return logger.log(severity, source, message, timestamp);
    } else {
        return new Jethro()
    }
}

/**
 * Jethro class constructor
 * @constructor
 * @property {uuid} id - Unique ID for Jethro Instance
 * @property {object} plugins - Container for plugin modules
 * @property {object} transports - Container for transport modules
 * @property {object} transports.console - Default console transport
 * @property {string} location - Location for the jethro instance
 * @returns {Jethro} Self
 */
function Jethro() {
    this.id = uuid.v4();

    this.plugins = {

    };

    this.transports = {
        "console": new JethroConsole()
    };

    this.location = os.hostname();

    return this;
}

util.inherits(Jethro, EventEmitter);

/**
 * Returns the ID of the Jethro instance
 * @returns {uuid} id - Returns the ID of the Jethro instance
 */
Jethro.prototype.getId = function() {
    return this.id;
};


//Transport API
/**
 * Adds transport to all event emitters
 * @param {Transport} transport - The instance of Transport to be imported
 * @param name {string} - The name of the transport to be assigned
 * @returns {Jethro} Self
 */
Jethro.prototype.addTransport = function(name, transport) {
    if (transport instanceof Transport) {
        this.transports[name] = (transport);
        return this;
    } else {
        throw new Error("Provided Transport not an instance of Transport Class");
    }
};

/**
 * Removes the requested/named transport from the event emitters
 * @param {string} name - Name of transport to be removed
 * @returns {Jethro} Self
 */
Jethro.prototype.removeTransport = function(name) {
    delete this.transports[name];
    return this;
};

/**
 * Returns the requested/named transport
 * @param {string} transport - Name of the transport to be found
 * @returns {Transport|Object} Instance of the saved transport
 */
Jethro.prototype.getTransport = function(transport) {
    //TODO: Add type validation
    if (typeof transport !== "undefined" && transport !== null) {
        for (var i in this.transports) {
            if (this.transports.hasOwnProperty(i)) {
                if (i === transport) {
                    return this.transports[i];
                }
            }
        } throw new Error("Transport not found by name");
    } else {
        return this.transports;
    }
};

/**
 * Returns the boolean whether or not the transport is enabled
 * @param transport {?string} - Name of the transport
 * @returns {boolean} Boolean of the transport's enabled state
 */
Jethro.prototype.transportDisabled = function(transport) {
    return this._getter(transport, "disabled");
};

/**
 * Returns the boolean of whether or not the transport is disabled
 * @param transport {?string} - Name of the transport
 * @returns {boolean} Boolean of the transport's disabled state
 */
Jethro.prototype.transportEnabled = function(transport) {
    return this._getter(transport, "enabled");
};

/**
 * Runs through getter functions of the Transport instances
 * @param transport {?string} - Name of transport to be acted on
 * @param func {string} - Name of function to be run
 * @returns {*} - Value returned by getter function
 * @private
 */
Jethro.prototype._getter = function(transport, func) {
    var t = this.getTransport(t);
    if (!(t instanceof Transport)) {
        var arr = {};
        for (var i in t) {
            if (t.hasOwnProperty(i)) {
                arr[i] = t[i][func]();
            }
        } return arr;
    } else {
        return transport[func]();
    }
};

/**
 * Runs through setter functions of the Transport instances
 * @param transport {?string} - Name of transport to be acted on
 * @param func {string} - Name of function to be run
 * @param a {*} - Value to be past onto upstream function
 * @param b {*} - Value to be past onto upstream function
 * @param c {*} - Value to be past onto upstream function
 * @returns {Jethro} Self
 * @private
 */
Jethro.prototype._setter = function(transport, func, a, b, c) {
    var t = this.getTransport(transport);
    if (!(t instanceof Transport)) {
        for (var i in t) {
            if (t.hasOwnProperty(i)) {
                t[i][func](a, b, c);
            }
        }
    } else {
        t[func]();
    } return this;
};


//Transports
/**
 * Disables the requested transport
 * @param transport {string} - Name of the transport
 * @returns {Jethro} Boolean of the transport's disabled state
 */
Jethro.prototype.disableTransport = function(transport) {
    var t = this.getTransport(transport);
    if (!(t instanceof Transport)) {
        throw new Error("Invalid transport");
    } else {
        t.disable();
    } return this;
};

/**
 * Enables the requested transport
 * @param [transport] {string} - Name of the transport to apply
 * @returns {Jethro} Self
 */
Jethro.prototype.enableTransport = function(transport) {
    var t = this.getTransport(transport);
    if (!(t instanceof Transport)) {
        throw new Error("Invalid transport");
    } else {
        t.enable();
    } return this;
};


// Colour
/**
 * Disables the colour on a requested transport
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {Jethro} Self
 */
Jethro.prototype.disableColor = Jethro.prototype.disableColour = function(transport) {
    return this._setter(transport, "disableColour");
};

/**
 * Enables the colour setting on the requested transport instance
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {Jethro} Self
 */
Jethro.prototype.enableColor = Jethro.prototype.enableColour = function(transport) {
    return this._setter(transport, "enableColour");
};

/**
 * Returns the colour settings of the requested transport
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {object} - Colour settings object
 */
Jethro.prototype.getColorSettings = Jethro.prototype.getColourSettings = function(transport) {
    return this._getter(transport, "getColourSettings");
};

/**
 * Disables the force colour setting of the requested transport
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {Jethro} Self
 */
Jethro.prototype.disableForceColor = Jethro.prototype.disableForceColour = function(transport) {
    return this._setter(transport, "disableForceColour");
};

/**
 * Enables the force colour string of the requested transport
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {Jethro} Self
 */
Jethro.prototype.enableForceColor = Jethro.prototype.enableForceColour = function(transport) {
    return this._setter(transport, "enableForceColour");
};

/**
 * Disables the bold colour setting of the requested transport
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {Jethro} Self
 */
Jethro.prototype.disableBoldColor = Jethro.prototype.disableBoldColour = function(transport) {
    return this._setter(transport, "disableBoldColour");
};

/**
 * Enables the bold colour stting of the requested transport
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {Jethro} Self
 */
Jethro.prototype.enableBoldColor = Jethro.prototype.enableBoldColour = function(transport) {
    return this._setter(transport, "enableBoldColour");
};


// Whitelist
/**
 * Adds the requested source to the requested whitelist
 * @param [transport] {?string} - Name of the transport to apply
 * @param str {string} - The name of the source to be added to the whitelist
 * @returns {Jethro} Self
 */
Jethro.prototype.addToWhitelist = function(transport, str) {
    return this._setter(transport, "addToWhitelist", str);
};

/**
 * Removes the requested source, from the requsted transport's whitelist
 * @param [transport] {?string} - Name of the transport to apply
 * @param str {string} - The name of the source to be removed from the whitelist
 * @returns {Jethro} Self
 */
Jethro.prototype.removeFromWhitelist = function(transport, str) {
    return this._setter(transport, "removeFromWhiteList", str);
};

/**
 * Returns the whitelist of the requested transport
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {Array} - Returns the array of the whitelist
 */
Jethro.prototype.getWhitelist = function(transport) {
    return this._getter(transport, "getWhitelist");
};

/**
 * Empties the whitelist of the requested transport
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {Jethro} Self
 */
Jethro.prototype.clearWhitelist = function(transport) {
    return this._setter(transport, "clearWhitelist");
};


// Blacklist
/**
 * Adds the requested source to the requested blacklist
 * @param [transport] {?string} - Name of the transport to apply
 * @param str {string} - The name of the source to be added to the blacklist
 * @returns {Jethro} Self
 */
Jethro.prototype.addToBlacklist = function(transport, str) {
    return this._setter(transport, "addToBlacklist", str);
};

/**
 * Removes the requested source, from the requsted transport's blacklist
 * @param [transport] {?string} - Name of the transport to apply
 * @param str {string} - The name of the source to be removed from the blacklist
 * @returns {Jethro} Self
 */
Jethro.prototype.removeFromBlacklist = function(transport, str) {
    return this._setter(transport, "removeFromBlacklist", str);
};

/**
 * Returns the blacklist of the requested transport
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {Array} - Returns the array of the blacklist
 */
Jethro.prototype.getBlacklist = function(transport) {
    return this._getter(transport, "getBlacklist");
};

/**
 * Empties the blacklist of the requested transport
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {Jethro} Self
 */
Jethro.prototype.clearBlacklist = function(transport) {
    return this._setter(transport, "disableBoldColour");
};


// Log Level
/**
 * Sets the log level, or allow/ignore value of a specific level for the specified transport
 * @param [transport] {?string} - Name of the transport to apply
 * @param str {string} - Name of the severity to be acted upon
 * @param  [value] {boolean} - Value of the severity to be set to
 * @returns {Jethro} Self
 */
Jethro.prototype.setLogLevel = function(transport, str, value) {
    return this._setter(transport, "disableBoldColour", str, value);
};


// Timestamp
/**
 * Enables the timestamp setting on the specified transport
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {Jethro} Self
 */
Jethro.prototype.enableTimestamp = function(transport) {
    return this._setter(transport, "enableTimestamp");
};

/**
 * Disables the timestamp setting on the specified transport
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {Jethro} Self
 */
Jethro.prototype.disableTimestamp = function(transport) {
    return this._setter(transport, "disableTimestamp");
};

/**
 * Enables the brackets on the timestamp of the specified transport
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {Jethro} - Returning self for chaining purposes
 */
Jethro.prototype.enableBrackets = function(transport) {
    return this._setter(transport, "enableBrackets");
};

/**
 * Disables the brackets on the timestamp of the specified transport
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {Jethro} Self
 */
Jethro.prototype.disableBrackets = function(transport) {
    return this._setter(transport, "disableBrackets");
};

/**
 * Sets the format for moment.js timestamp as on the requested transport
 * @param [transport] {?string} - Name of the transport to apply
 * @param str {string} - The new format value of the timestamp
 * @returns {Jethro} Self
 */
Jethro.prototype.setTimestampFormat = function(transport, str) {
    return this._setter(transport, "setTimestampFormat", str);
};

/**
 * Resets the timestamp format to the default value on the requested transport
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {Jethro} Self
 */
Jethro.prototype.resetTimestampFormat = function(transport) {
    return this._setter(transport, "resetTimestampFormat");
};

/**
 * Enables the UTC setting on the requested transport
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {Jethro} Self
 */
Jethro.prototype.enableUTC = function(transport) {
    return this._setter(transport, "enableUTC");
};

/**
 * Disables the UTC setting on the requested transport
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {Jethro} Self
 */
Jethro.prototype.disableUTC = function(transport) {
    return this._setter(transport, "disableUTC");
};


//Location
/**
 * Enables the location setting on the requested transport
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {Jethro} Self
 */
Jethro.prototype.enableLocation = function(transport) {
    return this._setter(transport, "enableLocation");
};

/**
 * Disables the location on the requested transport
 * @param [transport] {?string} - Name of the transport to apply
 * @returns {Jethro} Self
 */
Jethro.prototype.disableLocation = function(transport) {
    return this._setter(transport, "disableLocation");
};

/**
 * Returns the currently set location
 * @returns {string} location string
 */
Jethro.prototype.getLocation = function() {
    return this.location;
};

/**
 * Sets the global location setting
 * @param str {string} - Value for the location to be set to
 * @returns {Jethro} Self
 */
Jethro.prototype.setLocation = function(str) {
    this.location = str;
    return this;
};


//Plugin API - Not yet in use!
/**
 * [Unstable] Function to add plugins to Jethro
 * @param object
 * @param name
 * @returns {Jethro} Self
 */
Jethro.prototype.addPlugin = function(object, name) {
    this.plugins[name] = object;
    this.plugins[name].output(this._outputHandler);
    return this;
};

/**
 * [Unstable] Function to remove plugins from Jethro
 * @param {string} name - Name od the plugin to remove
 * @returns {Jethro} Self
 */
Jethro.prototype.removePlugin = function(name) {
    delete this.plugins[name];
    return this;
};

/**
 * [Unstable] Function for emitting internal errors
 * @param {object} data - data packet to be emitted
 * @private
 */
Jethro.prototype._errorHandler = function(data) {
    this.emit("error", data);
};

/**
 * Function for handling outputs to all transports
 * @param {object} data - data packet to be sent to transport modules
 * @private
 */
Jethro.prototype._outputHandler = function(data) {
    var notHandled = true;
    if (
        typeof data !== "undefined" &&
        typeof data.severity !== "undefined" &&
        typeof data.source !== "undefined" &&
        typeof data.message!== "undefined" &&
        typeof data.timestamp!== "undefined" &&
        typeof data.namespace !== "undefined"
    ) {
        for (var i in this.transports) {
            if (this.transports.hasOwnProperty(i)) {
                if (
                    this.transports[i].namespaces.length === 0 ||
                    this.transports[i].namespaces.indexOf(data.namespace) > -1
                ) {
                    notHandled = false;
                    this.transports[i]._input(data);
                }
            }
        }
        if (notHandled) {
            throw new Error("Namespace: " + data.namespace + " not handled");
        }
    } else {
        throw new Error("Missing parameters");
    }
};

/**
 * All purpose log function
 * @param {string} severity - Describes the severity of the log
 * @param {string} source - Declares the source of the log
 * @param {string} message - The message of the log
 * @param {Date|string} [timestamp] - The timestamp of the message, if not provided, new Date();
 * @param {string} [namespace] - The namespace for the log to emit to and be handled by
 */
Jethro.prototype.log = function(severity, source, message, timestamp, namespace) {
    if (typeof severity !== "object") {
        if (typeof severity !== "undefined" && typeof source !== "undefined" && typeof message !== "undefined") {
            this._outputHandler({
                severity: severity,
                source: source,
                message: message,
                timestamp: timestamp || new Date(),
                namespace: namespace || "logger",
                location: this.location
            });
        } else {
            this.log(
                "warning", "Logger", "Check syntax, something was undefined - Severity: "
                + severity + " Source: " + source + " Message: " + message
            );
        }
    } else {
        this.log("warning", "Logger", "An object was passed to Jethro, support for this is currently unavailable!");
    } return this;
};


/**
 * Direct log function, taking in a preformed object
 * @param data {object} - Contains preformed object to be logged
 * @param data.severity {string} - Describes the severity of the log
 * @param data.source {string} - Declares the source of the log
 * @param data.message {string} - The message of the log
 * @param [data.timestamp] {Date|string} - The timestamp of the message, if not provided, new Date();
 * @returns {Jethro} Self
 */
Jethro.prototype.direct = Jethro.prototype.output = function(data) {
    if (typeof data !== "undefined") {
        this.log(data.severity, data.source, data.message, data.timestamp);
    } else {
        throw new Error("Missing data parameter.");
    } return this;
};

/**
 * Log function with predefined info severity
 * @param {string} source - Declares the source of the log
 * @param {string} message - The message of the log
 * @param {Date|string} [timestamp] - The timestamp of the message, if not provided, new Date();
 * @param {string} [namespace] - The namespace for the log to emit to and be handled by
 * @returns {Jethro} Self
 */
Jethro.prototype.info = function(source, message, timestamp, namespace) {
    this.log("info", source, message, timestamp, namespace);
    return this;
};

/**
 * Log function with predefined transport severity
 * @param {string} source - Declares the source of the log
 * @param {string} message - The message of the log
 * @param {Date|string} [timestamp] - The timestamp of the message, if not provided, new Date();
 * @param {string} [namespace] - The namespace for the log to emit to and be handled by
 * @returns {Jethro} Self
 */
Jethro.prototype.transport = function(source, message, timestamp, namespace) {
    this.log("transport", source, message, timestamp, namespace);
    return this;
};

/**
 * Log function with predefined debug severity
 * @param {string} source - Declares the source of the log
 * @param {string} message - The message of the log
 * @param {Date|string} [timestamp] - The timestamp of the message, if not provided, new Date();
 * @param {string} [namespace] - The namespace for the log to emit to and be handled by
 * @returns {Jethro} Self
 */
Jethro.prototype.debug = function(source, message, timestamp, namespace) {
    this.log("debug", source, message, timestamp, namespace);
    return this;
};

/**
 * Log function with predefined success severity
 * @param {string} source - Declares the source of the log
 * @param {string} message - The message of the log
 * @param {Date|string} [timestamp] - The timestamp of the message, if not provided, new Date();
 * @param {string} [namespace] - The namespace for the log to emit to and be handled by
 * @returns {Jethro} Self
 */
Jethro.prototype.success = function(source, message, timestamp, namespace) {
    this.log("success", source, message, timestamp, namespace);
    return this;
};

/**
 * Log function with predefined warning severity
 * @param {string} source - Declares the source of the log
 * @param {string} message - The message of the log
 * @param {Date|string} [timestamp] - The timestamp of the message, if not provided, new Date();
 * @param {string} [namespace] - The namespace for the log to emit to and be handled by
 * @returns {Jethro} Self
 */
Jethro.prototype.warn = Jethro.prototype.warning = function(source, message, timestamp, namespace) {
    this.log("warning", source, message, timestamp, namespace);
    return this;
};

/**
 * Log function with predefined error severity
 * @param {string} source - Declares the source of the log
 * @param {string} message - The message of the log
 * @param {Date|string} [timestamp] - The timestamp of the message, if not provided, new Date();
 * @param {string} [namespace] - The namespace for the log to emit to and be handled by
 * @returns {Jethro} Self
 */
Jethro.prototype.error = function(source, message, timestamp, namespace) {
    this.log("error", source, message, timestamp, namespace);
    return this;
};

/**
 * Log function with predefined fatal error severity
 * @param {string} source - Declares the source of the log
 * @param {string} message - The message of the log
 * @param {Date|string} [timestamp] - The timestamp of the message, if not provided, new Date();
 * @param {string} [namespace] - The namespace for the log to emit to and be handled by
 * @returns {Jethro} Self
 */
Jethro.prototype.fatal = function(source, message, timestamp, namespace) {
    this.log("error", source, message, timestamp, namespace);
    //TODO: Make an actual fatal log setting
    //this._errorHandler(new Error(source + ": " + message));
    return this;
};

//Default logger instance
var logger = new Jethro();

module.exports = log;
module.exports.Transport = Transport;

//Map logger methods to exports
module.exports.log = logger.log.bind(logger);
module.exports.direct = logger.direct.bind(logger);
module.exports.output = logger.direct.bind(logger);

//Logging methods
module.exports.info = logger.info.bind(logger);
module.exports.transport = logger.transport.bind(logger);
module.exports.debug = logger.debug.bind(logger);
module.exports.success = logger.success.bind(logger);
module.exports.warn = logger.warn.bind(logger);
module.exports.warning = logger.warning.bind(logger);
module.exports.error = logger.error.bind(logger);
module.exports.fatal = logger.fatal.bind(logger);

//Core methods
module.exports.getId = logger.getId.bind(logger);
module.exports.addPlugin = logger.addPlugin.bind(logger);
module.exports.removePlugin = logger.removePlugin.bind(logger);

//Transport methods
module.exports.addTransport = logger.addTransport.bind(logger);
module.exports.removeTransport = logger.removeTransport.bind(logger);
module.exports.disableTransport = logger.disableTransport.bind(logger);
module.exports.enableTransport = logger.enableTransport.bind(logger);
module.exports.getTransport = logger.getTransport.bind(logger);

module.exports.transportDisabled = logger.transportDisabled.bind(logger);
module.exports.transportEnabled = logger.transportEnabled.bind(logger);

//Colour settings
module.exports.disableColour = logger.disableColour.bind(logger);
module.exports.disableColor = logger.disableColor.bind(logger);
module.exports.enableColour = logger.enableColour.bind(logger);
module.exports.enableColor = logger.enableColor.bind(logger);
module.exports.getColourSettings =  logger.getColourSettings.bind(logger);
module.exports.getColorSettings =  logger.getColorSettings.bind(logger);
module.exports.disableForceColour = logger.disableForceColour.bind(logger);
module.exports.disableForceColor = logger.disableForceColor.bind(logger);
module.exports.enableForceColour = logger.enableForceColour.bind(logger);
module.exports.enableForceColor = logger.enableForceColor.bind(logger);
module.exports.disableBoldColour = logger.disableBoldColour.bind(logger);
module.exports.disableBoldColor = logger.disableBoldColor.bind(logger);
module.exports.enableBoldColour = logger.enableBoldColour.bind(logger);
module.exports.enableBoldColor = logger.enableBoldColor.bind(logger);

//Whitelst/blacklist settings
module.exports.addToWhitelist = logger.addToBlacklist.bind(logger);
module.exports.removeFromWhitelist = logger.removeFromWhitelist.bind(logger);
module.exports.getWhitelist = logger.getWhitelist.bind(logger);
module.exports.clearWhitelist = logger.clearWhitelist.bind(logger);
module.exports.addToBlacklist = logger.addToBlacklist.bind(logger);
module.exports.removeFromBlacklist = logger.removeFromBlacklist.bind(logger);
module.exports.getBlacklist = logger.getBlacklist.bind(logger);
module.exports.clearBlacklist = logger.clearBlacklist.bind(logger);

module.exports.setLogLevel = logger.setLogLevel.bind(logger);

//Location
Jethro.prototype.enableLocation = logger.enableLocation.bind(logger);
Jethro.prototype.disableLocation = logger.disableLocation.bind(logger);
Jethro.prototype.getLocation = logger.getLocation.bind(logger);
Jethro.prototype.setLocation = logger.setLocation.bind(logger);

//Time settings
module.exports.enableTimestamp = logger.enableTimestamp.bind(logger);
module.exports.disableTimestamp = logger.disableTimestamp.bind(logger);
module.exports.enableBrackets = logger.enableBrackets.bind(logger);
module.exports.disableBrackets = logger.disableBrackets.bind(logger);
module.exports.setTimestampFormat = logger.setTimestampFormat.bind(logger);
module.exports.resetTimestampFormat = logger.resetTimestampFormat.bind(logger);
module.exports.enableUTC = logger.enableUTC.bind(logger);
module.exports.disableUTC =  logger.disableUTC.bind(logger);

//Event Emitter Methods
module.exports.on = logger.on.bind(logger);
module.exports.off = logger.off.bind(logger); //The one method that means we still have to use 'eventemitter3' thanks.
module.exports.emit = logger.emit.bind(logger);

//Native Transports
module.exports.JethroConsole = JethroConsole;
module.exports.JethroFile = JethroFile;

//Native Plugins
