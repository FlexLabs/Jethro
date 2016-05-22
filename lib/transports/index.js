var uuid = require("uuid");

/**
 * Transport constructor for output modules
 * @constructor
 * @property {uuid} id - ID for identifying transport
 * @property {?function} errorHandler - errorHandler callback placeholder
 * @property {Array} namespaces - Array for namespaces to listen to
 * @returns
 */
function Transport() {
    this.id = uuid.v4();
    this.errorHandler = null;
    this.namespaces = [];
    return this;
}

/**
 * Setting objext
 * @type {object}
 * @property {boolean} enabled
 * @property {object} colour
 * @property {boolean} colour.enabled
 * @property {boolean} colour.bold
 * @property {boolean} colour.force
 * @property {object} severity
 * @property {boolean} severity.debug
 * @property {boolean} severity.transport
 * @property {boolean} severity.info
 * @property {boolean} severity.success
 * @property {boolean} severity.warning
 * @property {boolean} severity.error
 * @property {object} source
 * @property {?string} source.enabled
 * @property {Array} source.whitelist
 * @property {Array} source.blacklist
 * @property {object} timestamp
 * @property {boolean} timestamp.enabled
 * @property {string} timestamp.format
 * @property {boolean} timestamp.utc
 * @property {boolean} timestamp.brackets
 * @property {object} location
 * @property {boolean} location.enabled
 */
Transport.prototype._settings = require("./settings.json");

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
 * @param str
 * @returns {Transport} Self
 */
Transport.prototype.addToWhitelist = function(str) {
    if (typeof str !== "undefined" && this._settings.source.whitelist.indexOf(str) === -1) {
        this._settings.source.whitelist.push(str);
    } return this;
};

/**
 * Removes the specified string from the source whitelist for this transport
 * @param str
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
 * @param str
 * @returns {Transport} Self
 */
Transport.prototype.addToBlacklist = function(str) {
    if (this._settings.source.blacklist.indexOf(str) === -1) {
        this._settings.source.blacklist.push(str);
    } return this;
};

/**
 * Removes the specified string from the source blacklist for this transport
 * @param str
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
 * @returns {Jethro} Self
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
 * @returns {Jethro} Self
 */
Transport.prototype.enableTimestamp = function() {
    this._settings.timestamp.enabled = true;
    return this;
};

/**
 * Disables the timestamp setting for this transport
 * @returns {Jethro} Self
 */
Transport.prototype.disableTimestamp = function() {
    this._settings.timestamp.enabled = false;
    return this;
};

/**
 * Enables the brackets on the timestamp for this transport
 * @returns {Jethro} - Returning self for chaining purposes
 */
Transport.prototype.enableBrackets = function() {
    this._settings.timestamp.brackets = true;
    return this;
};


/**
 * Disables the brackets on the timestamp for this transport
 * @returns {Jethro} Self
 */
Transport.prototype.disableBrackets = function() {
    this._settings.timestamp.brackets = false;
    return this;
};

/**
 * Sets the format for moment.js timestamp string for this transport
 * @param str {string} - The new format value of the timestamp
 * @returns {Jethro} Self
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
 * @returns {Jethro} Self
 */
Transport.prototype.resetTimestampFormat = function() {
    this._settings.timestamp.format = "HH:mm:ss[s] SSS[ms]";
    return this;
};

/**
 * Enables the UTC setting for this transport
 * @returns {Jethro} Self
 */
Transport.prototype.enableUTC = function() {
    this._settings.timestamp.utc = true;
    return this;
};

/**
 * Disables the UTC setting ofor this transport
 * @returns {Jethro} Self
 */
Transport.prototype.disableUTC = function() {
    this._settings.timestamp.utc = false;
    return this;
};


// Location

/**
 * Enables the location for this transport
 * @returns {Jethro} Self
 */
Transport.prototype.enableLocation = function() {
    //TODO: Enforce this within the console transport
    this._settings.location.enabled = true;
    return this;
};

/**
 * Disables the location for this transport
 * @returns {Jethro} Self
 */
Transport.prototype.disableLocation = function() {
    this._settings.location.enabled = true;
    return this;
};

/**
 * @inheritdoc
 * @type {*|capitalise}
 */
Transport.prototype.capitalise = require("./utils.js").capitalise;

/**
 * @inheritdoc
 * @type {*|getMessage}
 */
Transport.prototype.getMessage = require("./utils.js").getMessage;

/**
 * @inheritdoc
 * @type {*|getSeverity}
 */
Transport.prototype.getSeverity = require("./utils.js").getSeverity;

/**
 * @inheritdoc
 * @type {*|getSeverityColour}
 */
Transport.prototype.getSeverityColour = require("./utils.js").getSeverityColour;

/**
 * @inheritdoc
 * @type {*|getSource}
 */
Transport.prototype.getSource = require("./utils.js").getSource;

/**
 * @inheritdoc
 * @type {*|getTimestamp}
 */
Transport.prototype.getTimestamp = require("./utils.js").getTimestamp;

/**
 * @inheritdoc
 * @type {*|formatString}
 */
Transport.prototype.formatString = require("./utils.js").formatString;

/**
 * @inheritdoc
 * @type {*|spaceOut}
 */
Transport.prototype.spaceOut = require("./utils.js").spaceOut;

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