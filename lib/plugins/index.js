'use strict';

/**
 * @private
 * @type {Utilities}
 */
const Utilities = require("../utils.js");
const util = require("util");

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
 * @param {string} severity - Severity of the log to output
 * @param {string} source - Source of the log to output
 * @param {string} message - Message to log
 * @param {?Date|string} [timestamp] - Timestamp of the log
 * @param {Error} [err] - Error object
 * @param {Object} [x] - Custom logging object
 * @returns {Plugin} Self
 */
Plugin.prototype.log = function(severity, source, message, timestamp, err, x) {
    return this._output({
        severity,
        source,
        message,
        timestamp: timestamp || new Date(),
        namespace: this.namespace,
        err: err || null,
        x: x || null
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
        typeof data === "object" &&
        data != null &&
        typeof data.severity !== "undefined" &&
        typeof data.source !== "undefined" &&
        typeof data.message !== "undefined" &&
        typeof data.timestamp !== "undefined" &&
        typeof data.namespace !== "undefined"
    ) {
        for (let i = 0; i < this.listeners.length; i++) {
            if (typeof this.listeners[i] === 'function') {
                this.listeners[i](data);
            }
        } return this;
    }
    throw new Error("Missing parameters");

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
    if (this.errorHandlers.length > 0) {
        for (let i = 0; i < this.errorHandlers.length; i++) {
            if (typeof this.errorHandlers[i] === 'function') {
                this.errorHandlers[i](data);
            }
        }

        return this;
    }
    throw data;
};

module.exports = Plugin;
