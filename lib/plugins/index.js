/**
 * Plugin
 * @constructor
 */
function Plugin() {
    this.namespace = "logger";
    this.listeners = [];
    this.errorHandlers = [];
}

/**
 *
 * @param severity
 * @param source
 * @param message
 * @param timestamp
 * @returns {Plugin}
 */
Plugin.prototype.log = function(severity, source, message, timestamp) {
    this._output({
        severity: severity,
        source: source,
        message: message,
        timestamp: timestamp || new Date(),
        namespace: this.namespace
    });
    return this;
};

/**
 *
 * @param data
 * @returns {Plugin}
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
 *
 * @param callback
 * @returns {Plugin}
 * @private
 */
Plugin.prototype._onOutput = function(callback) {
    this.listeners.push(callback);
    return this;
};

/**
 *
 * @param callback
 * @returns {Plugin}
 * @private
 */
Plugin.prototype._onError = function(callback) {
    this.errorHandlers.push(callback);
    return this;
};

/**
 *
 * @param data
 * @returns {Plugin}
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