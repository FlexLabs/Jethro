var uuid = require("uuid");

/**
 * Transport constructor for output modules
 * @constructor
 */
function Transport() {
    this.id = uuid.v4();
    this.errorHandler = null;
    this.namespaces = [];
}

// Settings

Transport.prototype._settings = require("./settings.json");

/* Public */

// Enable/Disable transport
Transport.prototype.disable = function() {
    this._settings.enabled = false;
    return this;
};

Transport.prototype.enable = function() {
    this._settings.enabled = true;
    return this;
};

Transport.prototype.enabled = function() {
    return this._settings.enabled;
};

Transport.prototype.disabled = function() {
    return !this._settings.enabled;
};


// Colour
Transport.prototype.disableColour = function() {
    this._settings.colour.enabled = false;
    return this;
};

Transport.prototype.enableColour = function() {
    this._settings.colour.enabled = true;
    return this;
};

Transport.prototype.getColourSettings = function() {
    return this._settings.colour;
};

Transport.prototype.disableForceColour = function() {
    this._settings.colour.force = false;
    return this;
};

Transport.prototype.enableForceColour = function() {
    this._settings.colour.force = true;
    return this;
};

Transport.prototype.disableBoldColour = function() {
    this._settings.colour.bold = false;
    return this;
};

Transport.prototype.enableBoldColour = function() {
    this._settings.colour.bold = true;
    return this;
};


// Whitelist
Transport.prototype.addToWhitelist = function(str) {
    if (typeof str !== "undefined" && this._settings.source.whitelist.indexOf(str) === -1) {
        this._settings.source.whitelist.push(str);
    } return this;
};

Transport.prototype.removeFromWhitelist = function(str) {
    var index = this._settings.source.whitelist.indexOf(str);
    if (index > -1) {
        this._settings.source.whitelist.splice(index, 1);
    } return this;
};

Transport.prototype.getWhitelist = function() {
    return this._settings.source.whitelist;
};

Transport.prototype.clearWhitelist = function() {
    this._settings.source.whitelist = [];
    return this;
};


// Blacklist
Transport.prototype.addToBlacklist = function(str) {
    if (this._settings.source.blacklist.indexOf(str) === -1) {
        this._settings.source.blacklist.push(str);
    } return this;
};

Transport.prototype.removeFromBlacklist = function(str) {
    var index = this._settings.source.blacklist.indexOf(str);
    if (index > -1) {
        this._settings.source.blacklist.splice(index, 1);
    } return this;
};

Transport.prototype.getBlacklist = function() {
    return this._settings.source.Blacklist;
};

Transport.prototype.clearBlacklist = function() {
    this._settings.source.blacklist = [];
    return this;
};


// Log Level
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
Transport.prototype.enableTimestamp = function() {
    this._settings.timestamp.enabled = true;
    return this;
};

Transport.prototype.disableTimestamp = function() {
    this._settings.timestamp.enabled = false;
    return this;
};

Transport.prototype.enableBrackets = function() {
    this._settings.timestamp.brackets = true;
    return this;
};

Transport.prototype.disableBrackets = function() {
    this._settings.timestamp.brackets = false;
    return this;
};

Transport.prototype.setTimestampFormat = function(data) {
    if (typeof data === "string") {
        this._settings.timestamp.format = data;
        return this;
    } else {
        throw new Error("Argument not a string");
    }
};

Transport.prototype.resetTimestampFormat = function() {
    this._settings.timestamp.format = "HH:mm:ss[s] SSS[ms]";
    return this;
};

Transport.prototype.enableUTC = function() {
    this._settings.timestamp.utc = true;
    return this;
};

Transport.prototype.disableUTC = function() {
    this._settings.timestamp.utc = false;
    return this;
};


// Location
Transport.prototype.enableLocation = function() {
    //TODO: Enforce this within the console transport
    this._settings.location.enabled = true;
    return this;
};

Transport.prototype.disableLocation = function() {
    this._settings.location.enabled = true;
    return this;
};

Transport.prototype.getLocation = function() {
    return this._settings.location.value;
};

Transport.prototype.setLocation = function(str) {
    if (typeof str === "string") {
        this._settings.location.value = str;
    } else {
        throw new Error("Parameter is not a string");
    } return this;
};

// Private
Transport.prototype.formatString = require('./utils/formatString.js');

/**
 * Internal 
 * @param data
 * @private
 */
Transport.prototype._input = function(data) {
    if (typeof this.output === "function") {
        if (this.namespaces.length === 0 ||
            this.namespaces.indexOf(data.namespace) > -1
        ) {
            this.output(data);
        }
    } else {
        throw new Error("No output prototype found for transport");
    }
};

Transport.prototype.onError = function(callback) {
    this.errorHandler = callback;
};

module.exports = Transport;