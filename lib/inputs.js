/* Input Methods
 * - Info
 * - Transport
 * - Debug
 * - Success
 * - Warn
 * - Error
 */

module.exports.direct = function(data) {
    if (typeof data !== "undefined") {
        this.log(data.severity, data.source, data.message, data.timestamp);
    } else {
        throw new Error("Missing data parameter.");
    } return this;
};

//Severity based
module.exports.info = function(source, message, timestamp) {
    this.log("info", source, message, timestamp);
    return this;
};

module.exports.transport = function(source, message, timestamp) {
    this.log("transport", source, message, timestamp);
    return this;
};

module.exports.debug = function(source, message, timestamp) {
    this.log("debug", source, message, timestamp);
    return this;
};

module.exports.success = function(source, message, timestamp) {
    this.log("success", source, message, timestamp);
    return this;
};

module.exports.warn = function(source, message, timestamp) {
    this.log("warning", source, message, timestamp);
    return this;
};

module.exports.error = function(source, message, timestamp) {
    this.log("error", source, message, timestamp);
    return this;
};

module.exports.fatal = function(source, message, timestamp) {
    this.log("error", source, message, timestamp);
    //throw new Error(source + ": " + message);
    return this;
};