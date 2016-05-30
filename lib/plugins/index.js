/**
 * @private
 * @type {Utilities}
 */
var Utilities = require("../utils.js");
var util = require("util");

/**
 * Constructor for all plugins
 * @returns {Plugin} Self
 * @constructor
 * @augments {Utilities}
 */
function Plugin() {

    /**
     * Namespace for this plugin to use, typically the name of the plugin is used
     * @type {string}
     */
    this.namespace = "logger";

    /**
     * Array containing the listeners of this plugin
     * Multiple instances of Jethro may listen to the same plugin
     * @private
     * @type {Array}
     */
    this.listeners = [];

    /**
     * Array containing the error handlers for this plugin, usually the Jethro instance where this plugin is hosted
     * @private
     * @type {Array}
     */
    this.errorHandlers = [];
    
    return this;
}

util.inherits(Plugin, Utilities);

/**
 * Default input function
 * Throws if not overwritten
 */
Plugin.prototype.input = function() {
    throw new Error("Input function not overwritten!");
};

/**
 * Internal log function, sends to the listening Jethro instances
 * Sets namespace to data to output
 * Sets timestamp if undefined
 * @param severity - Severity of the log to output
 * @param source - Source of the log to output
 * @param message - Message to log
 * @param timestamp - Timestamp of the log
 * @returns {Plugin} Self
 */
Plugin.prototype.log = function(severity, source, message, timestamp) {
    return this._output({
        severity: severity,
        source: source,
        message: message,
        timestamp: timestamp || new Date(),
        namespace: this.namespace
    });
};

/**
 * Private output function for sending to listening Jethro instances
 * @param data
 * @returns {Plugin} Self
 * @private
 */
Plugin.prototype._output = function(data) {
    if (
        typeof data !== "undefined" &&
        typeof data.severity !== "undefined" &&
        typeof data.source !== "undefined" &&
        typeof data.message !== "undefined" &&
        typeof data.timestamp !== "undefined" &&
        typeof data.namespace !== "undefined"
    ) {
        for (var i in this.listeners) {
            if (this.listeners.hasOwnProperty(i)) {
                this.listeners[i](data);
            }
        } return this;
    } else {
        throw new Error("Missing parameters");
    }
};

/**
 * Private function to add new listeners to this plugin
 * @param callback
 * @returns {Plugin} Self
 * @private
 */
Plugin.prototype._onOutput = function(callback) {
    this.listeners.push(callback);
    return this;
};

/**
 * Private function to add new error listeners to this plugin
 * @param callback
 * @returns {Plugin} Self
 * @private
 */
Plugin.prototype._onError = function(callback) {
    this.errorHandlers.push(callback);
    return this;
};

/**
 * Set namespace variable
 * @param {string} str - String to set namespace to
 * @returns {Plugin} Self
 */
Plugin.prototype.setNamespace = function(str) {
    if (typeof str === "string") {
        this.namespace = str;
    } else {
        throw new Error("Not a string");
    } return this;
};

/**
 * Return the namespace variable
 * @returns {string} Namespace variable
 */
Plugin.prototype.getNamespace = function() {
    return this.namespace;
};

/**
 * Internal function to throw error to listeners
 * @param data
 * @returns {Plugin} Self
 * @private
 */
Plugin.prototype._throwError = function(data) {
    for (var i in this.errorHandlers) {
        if (this.errorHandlers.hasOwnProperty(i)) {
            this.errorHandlers[i](data);
        }
    } return this;
};

module.exports = Plugin;