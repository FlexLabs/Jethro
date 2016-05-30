/**
 * Setting object
 * @constructor
 * @returns {Settings}
 */
function Settings() {

    /**
     * Boolean of whether the transport is active or not
     * @type {boolean}
     */
    this.enabled = true;

    /**
     * Colour settings
     * @property {boolean} enabled - Boolean of whether colour output is enabled
     * @property {boolean} bold - Boolean for enabling bold output
     * @property {boolean} force - Boolean for forcing colour output, even if not supported
     * @type {{bold: boolean, enabled: boolean, force: boolean}}
     */
    this.colour = {
        "bold": true,
        "enabled": true,
        "force": false
    };

    /**
     * Severity settings
     * @property {boolean} debug - Boolean for allowing/disallowing debug severity output
     * @property {boolean} transport - Boolean for allowing/disallowing transport severity output
     * @property {boolean} info - Boolean for allowing/disallowing debug info output
     * @property {boolean} success - Boolean for allowing/disallowing debug success output
     * @property {boolean} warning - Boolean for allowing/disallowing debug warning output
     * @property {boolean} error - Boolean for allowing/disallowing debug error output
     * @type {{debug: boolean, transport: boolean, info: boolean, success: boolean, warning: boolean, error: boolean}}
     */
    this.severity = {
        "debug": true,
        "transport": true,
        "info": true,
        "success": true,
        "warning": true,
        "error": true
    };

    /**
     * Source settings
     * @property {?string} enabled - String for whether source whitelist, blacklist or neither are enabled
     * @property {Array} whitelist - List of allowed sources to output through this transport
     * @property {Array} blacklist - List of disallowed sources not to output through this transport
     * @type {{enabled: null, whitelist: Array, blacklist: Array}}
     */
    this.source = {
        "enabled": null,
        "whitelist": [],
        "blacklist": []
    };

    /**
     * Timestamp settings
     * @property {boolean} enabled - Boolean of whether timestamp is part of the output string
     * @property {string} format - Format moment.js should follow for the timestamp
     * @property {boolean} utc - Boolean to force timestamp in UTC
     * @property {boolean} brackets - Boolean to wrap timestamp in brackets
     * @type {{enabled: boolean, format: string, utc: boolean, brackets: boolean}}
     */
    this.timestamp = {
        "enabled": true,
        "format": "HH:mm:ss[s] SSS[ms]",
        "utc": false,
        "brackets": false
    };

    /**
     * Location settings
     * @property {boolean} enabled - Boolean of whether to display location or not
     * @type {{enabled: boolean}}
     */
    this.location = {
        "enabled": false
    };

    return this;
}

/**
 * Returns whether the settings object variables are intact
 * @returns {boolean} Boolean value for all variable validation checks
 */
Settings.prototype.isValid = function() {
    return typeof this.colour !== "undefined" &&
        typeof this.severity !== "undefined" &&
        typeof this.source !== "undefined" &&
        typeof this.timestamp !== "undefined" &&
        typeof this.location !== "undefined" &&
        (this.enabled === true || this.enabled === false) &&
        (this.colour.bold === true || this.colour.bold === false) &&
        (this.colour.enabled === true || this.colour.enabled === false) &&
        (this.colour.force === true || this.colour.force === false) &&
        (this.severity.debug === true || this.severity.debug === false) &&
        (this.severity.transport === true || this.severity.transport === false) &&
        (this.severity.info === true || this.severity.info === false) &&
        (this.severity.success === true || this.severity.success === false) &&
        (this.severity.warning === true || this.severity.warning === false) &&
        (this.severity.error === true || this.severity.error === false) &&
        (this.source.enabled === "whitelist" || this.source.enabled === "blacklist" || this.source.enabled === null) &&
        Array.isArray(this.source.whitelist) &&
        Array.isArray(this.source.blacklist) &&
        (this.timestamp.enabled === true || this.timestamp.enabled === false) &&
        (typeof this.timestamp.format === "string") &&
        (this.timestamp.utc === true || this.timestamp.utc === false) &&
        (this.timestamp.brackets === true || this.timestamp.brackets === false) &&
        (this.location.enabled === true || this.location.enabled === false);

};


Settings.prototype.importSettings = function(settings) {
    if (typeof settings === "object" && settings !== null) {
        if (typeof settings.output !== "undefined") {

            //Legacy setting object
            this.enabled = true;
            this.colour = {
                "bold": true,
                "enabled": settings.output.colour || true,
                "force": false
            };
            this.severity = {
                "debug": true,
                "transport": true,
                "info": true,
                "success": true,
                "warning": true,
                "error": true
            };
            this.source = {
                "enabled": null,
                "whitelist": settings.output.source.whitelist || [],
                "blacklist": settings.output.source.blacklist || []
            };
            this.timestamp = {
                "enabled": settings.output.timestamp || true,
                "format": settings.timeformat === "undefined" ? "HH:mm:ss[s] SSS[ms]" : settings.timeformat,
                "utc": settings.output.timestampOpts.utc || false,
                "brackets": settings.output.timestampOpts.brackets || false
            };
            this.location = {
                "enabled": false
            };
        } else {

            //New Setting object
            this.enabled = settings.enabled || true;
            this.colour = {
                "bold": settings.colour.bold || true,
                "enabled": settings.colour.enabled || true,
                "force": settings.colour.force || false
            };
            this.severity = {
                "debug": settings.severity.debug || true,
                "transport": settings.severity.transport || true,
                "info": settings.severity.info || true,
                "success": settings.severity.success || true,
                "warning": settings.severity.warning || true,
                "error": settings.severity.error || true
            };
            this.source = {
                "enabled": settings.source.enabled || null,
                "whitelist": settings.source.whitelist || [],
                "blacklist": settings.source.blacklist || []
            };
            this.timestamp = {
                "enabled": settings.timestamp.enabled || true,
                "format": settings.timestamp.format || "HH:mm:ss[s] SSS[ms]",
                "utc": settings.timestamp.utc || false,
                "brackets": settings.timestamp.brackets || false
            };
            this.location = {
                "enabled": settings.location.enabled || false
            };
        }
    } else {
        throw new Error("Unexpected object in bagging area");
    }
};

/**
 * Reverts setting variables to default values if they are incorrect
 * @returns {Settings} Self
 */
Settings.prototype.clean = function() {
    if (this.enabled !== true && this.enabled !== false) {
        this.enabled = false;
    } if (typeof this.colour !== "undefined") {
        if (this.colour.bold !== true && this.colour.bold !== false) {
            this.colour.bold = true;
        }
        if (this.colour.enabled !== true && this.colour.enabled !== false) {
            this.colour.enabled = true;
        }
        if (this.colour.force !== true && this.colour.force !== false) {
            this.colour.force = false;
        }
    } else {
        this.colour = {
            "bold": true,
            "enabled": true,
            "force": false
        };
    } if (typeof this.severity !== "undefined") {
        if (this.severity.debug !== true && this.severity.debug !== false) {
            this.severity.debug = true;
        }
        if (this.severity.transport !== true && this.severity.transport !== false) {
            this.severity.transport = true;
        }
        if (this.severity.info !== true && this.severity.info !== false) {
            this.severity.info = true;
        }
        if (this.severity.success !== true && this.severity.success !== false) {
            this.severity.success = true;
        }
        if (this.severity.warning !== true && this.severity.warning !== false) {
            this.severity.warning = true;
        }
        if (this.severity.error !== true && this.severity.error !== false) {
            this.severity.error = true;
        }
    } else {
        this.severity = {
            "debug": true,
            "transport": true,
            "info": true,
            "success": true,
            "warning": true,
            "error": true
        };
    } if (typeof this.source !== "undefined") {
        if (this.source.enabled !== "whitelist" && this.source.enabled !== "blacklist" && this.source.enabled !== null) {
            this.source.enabled = null;
        }
        if (!(Array.isArray(this.source.whitelist))) {
            this.source.whitelist = [];
        }
        if (!(Array.isArray(this.source.blacklist))) {
            this.source.blacklist = [];
        }
    } else {
        this.source = {
            "enabled": null,
            "whitelist": [],
            "blacklist": []
        };
    } if (typeof this.timestamp !== "undefined") {
        if (this.timestamp.enabled !== true && this.timestamp.enabled !== false) {
            this.timestamp.enabled = true;
        }
        if (typeof this.timestamp.format === "string") {
            this.resetTimestampFormat();
        }
        if (this.timestamp.utc !== true && this.timestamp.utc !== false) {
            this.timestamp.utc = false;
        }
        if (this.timestamp.brackets !== true && this.timestamp.brackets !== false) {
            this.timestamp.brackets = false;
        }
    } else {
        this.timestamp = {
            "enabled": true,
            "format": "HH:mm:ss[s] SSS[ms]",
            "utc": false,
            "brackets": false
        };
    } if (typeof this.location !== "undefined") {
        if (this.location.enabled !== true && this.location.enabled !== false) {
            this.location.enabled = false;
        }
    } else {
        this.location = {
            "enabled": false
        };
    } return this;
};

/**
 * Disables the current transport
 * @returns {Settings} Self
 */
Settings.prototype.disable = function() {
    this.enabled = false;
    return this;
};

/**
 * Enables the current Transport
 * @returns {Settings} Self
 */
Settings.prototype.enable = function() {
    this.enabled = true;
    return this;
};

/**
 * Returns whether this transport is enabled
 * @returns {boolean} Boolean of the transport's enabled state
 */
Settings.prototype.enabled = function() {
    return this.enabled;
};

/**
 * Returns whether this transport is disabled
 * @returns {boolean} Boolean of the transport's disabled state
 */
Settings.prototype.disabled = function() {
    return !this.enabled;
};


// Colour
/**
 * Disables the colour setting for this transport
 * @returns {Settings} Self
 */
Settings.prototype.disableColor = Settings.prototype.disableColour = function() {
    this.colour.enabled = false;
    return this;
};

/**
 * Enables the colour setting for this transport
 * @returns {Settings} Self
 */
Settings.prototype.enableColor = Settings.prototype.enableColour = function() {
    this.colour.enabled = true;
    return this;
};

/**
 * Returns the colour setting object for this transport
 * @returns {object} Colour settings object
 */
Settings.prototype.getColorSettings = Settings.prototype.getColourSettings = function() {
    return this.colour;
};

/**
 * Disables the force colour option for this transport
 * @returns {Settings} Self
 */
Settings.prototype.disableForceColor = Settings.prototype.disableForceColour = function() {
    this.colour.force = false;
    return this;
};

/**
 * Enables the force colour option for this transport
 * @returns {Settings} Self
 */
Settings.prototype.enableForceColor = Settings.prototype.enableForceColour = function() {
    this.colour.force = true;
    return this;
};

/**
 * Disables the bold colour option for this transport
 * @returns {Settings} Self
 */
Settings.prototype.disableBoldColor = Settings.prototype.disableBoldColour = function() {
    this.colour.bold = false;
    return this;
};

/**
 * Enables the bold colour option for this transport
 * @returns {Settings} Self
 */
Settings.prototype.enableBoldColor = Settings.prototype.enableBoldColour = function() {
    this.colour.bold = true;
    return this;
};


// Whitelist
/**
 * Adds the specified string to the source whitelist for this transport
 * @param {string} str - Value to add to whitelist
 * @returns {Settings} Self
 */
Settings.prototype.addToSourceWhitelist = function(str) {
    if (typeof str !== "undefined" && this.source.whitelist.indexOf(str) === -1) {
        this.source.whitelist.push(str);
    } return this;
};

/**
 * Removes the specified string from the source whitelist for this transport
 * @param {string} str - Value remove from whitelist
 * @returns {Settings} Self
 */
Settings.prototype.removeFromSourceWhitelist = function(str) {
    var index = this.source.whitelist.indexOf(str);
    if (index > -1) {
        this.source.whitelist.splice(index, 1);
    } return this;
};

/**
 * Returns the whitelist array for this transport
 * @returns {Array} Whitelist
 */
Settings.prototype.getSourceWhitelist = function() {
    return this.source.whitelist;
};

/**
 * Clears the whitelist for this transport
 * @returns {Settings} Self
 */
Settings.prototype.clearSourceWhitelist = function() {
    this.source.whitelist = [];
    return this;
};

// Blacklist
/**
 * Adds the specified string to the source blacklist for this transport
 * @param {string} str - Value to add to blacklist
 * @returns {Settings} Self
 */
Settings.prototype.addToSourceBlacklist = function(str) {
    if (this.source.blacklist.indexOf(str) === -1) {
        this.source.blacklist.push(str);
    } return this;
};

/**
 * Removes the specified string from the source blacklist for this transport
 * @param {string} str - Value to remove from blacklist
 * @returns {Settings} Self
 */
Settings.prototype.removeFromSourceBlacklist = function(str) {
    var index = this.source.blacklist.indexOf(str);
    if (index > -1) {
        this.source.blacklist.splice(index, 1);
    } return this;
};

/**
 * Returns the blacklist array for this transport
 * @returns {Array} Whitelist
 */
Settings.prototype.getSourceBlacklist = function() {
    return this.source.blacklist;
};

/**
 * Clears the blacklist for this transport
 * @returns {Settings} Self
 */
Settings.prototype.clearSourceBlacklist = function() {
    this.source.blacklist = [];
    return this;
};

//Source Control
/**
 * Set the source control variable
 * @param {string} str - String to set
 * @returns {Settings} Self
 */
Settings.prototype.setSourceControlSetting = function(str) {
    if (str === "whitelist") {
        this.source.enabled = "whitelist";
        return this;
    } else if (str === "blacklist") {
        this.source.enabled = "blacklist";
        return this;
    } else if (str === null) {
        this.source.enabled = null;
        return this;
    } else {
        throw new Error("Unrecognised source control setting");
    }
};

/**
 * Returns the state of the source conrol variable
 * @returns {String} Source control setting
 */
Settings.prototype.getSourceControlSetting = function() {
    return this.source.enabled;
};

/**
 * Resets source whitelist, blacklist and enabled boolean
 * @returns {Settings} Self
 */
Settings.prototype.resetSourceControl = function() {
    this.source.whitelist = [];
    this.source.blacklist = [];
    this.source.enabled = null;
    return this;
};

/**
 * Disables source control setting
 * @returns {Settings} Self
 */
Settings.prototype.disableSourceControlSetting = function() {
    this.source.enabled = null;
    return this;
};


// Log Level
/**
 * Sets the log level, or allow/ignore value of a specific level for this transport
 * @param str {string} - Name of the severity to be acted upon
 * @param  [value] {boolean} - Value of the severity to be set to
 * @returns {Settings} Self
 */
Settings.prototype.setLogLevel = function(str, value) {
    //TODO: Fix behaviour
    if (typeof str !== "undefined" && value !== "undefined") {
        if (value === true || value === false) {
            var s = this.severity;
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
 * @returns {Settings} Self
 */
Settings.prototype.enableTimestamp = function() {
    this.timestamp.enabled = true;
    return this;
};

/**
 * Disables the timestamp setting for this transport
 * @returns {Settings} Self
 */
Settings.prototype.disableTimestamp = function() {
    this.timestamp.enabled = false;
    return this;
};

/**
 * Enables the brackets on the timestamp for this transport
 * @returns {Settings} - Returning self for chaining purposes
 */
Settings.prototype.enableBrackets = function() {
    this.timestamp.brackets = true;
    return this;
};


/**
 * Disables the brackets on the timestamp for this transport
 * @returns {Settings} Self
 */
Settings.prototype.disableBrackets = function() {
    this.timestamp.brackets = false;
    return this;
};

/**
 * Sets the format for moment.js timestamp string for this transport
 * @param str {string} - The new format value of the timestamp
 * @returns {Settings} Self
 */
Settings.prototype.setTimestampFormat = function(str) {
    if (typeof str === "string") {
        this.timestamp.format = str;
        return this;
    } else {
        throw new Error("Argument not a string");
    }
};

/**
 * Resets the timestamp format to the default value for this transport
 * @returns {Settings} Self
 */
Settings.prototype.resetTimestampFormat = function() {
    this.timestamp.format = "HH:mm:ss[s] SSS[ms]";
    return this;
};

/**
 * Enables the UTC setting for this transport
 * @returns {Settings} Self
 */
Settings.prototype.enableUTC = function() {
    this.timestamp.utc = true;
    return this;
};

/**
 * Disables the UTC setting ofor this transport
 * @returns {Settings} Self
 */
Settings.prototype.disableUTC = function() {
    this.timestamp.utc = false;
    return this;
};


// Location

/**
 * Enables the location for this transport
 * @returns {Settings} Self
 */
Settings.prototype.enableLocation = function() {
    this.location.enabled = true;
    return this;
};

/**
 * Disables the location for this transport
 * @returns {Settings} Self
 */
Settings.prototype.disableLocation = function() {
    this.location.enabled = false;
    return this;
};

module.exports = Settings;