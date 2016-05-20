var util = require("util");
var uuid = require("uuid");
var EventEmitter = require("eventemitter3");
var JethroConsole = require('./transports/console.js');
var Transport = require('./transports/index.js');

function Jethro(a, b, c) {
	if (!(this instanceof Jethro)) {
        return logger.log(a, b, c);
	}

    this.id = uuid().v4;

    this.namespaces = [
        "logger"
    ];
    
    this.plugins = {

    };
    
    this.transports = {
        "console": new JethroConsole()
    };
    
    this.start();
}

util.inherits(Jethro, EventEmitter);

Jethro.prototype.getId = function() {
    return this.id;
};

Jethro.prototype._settings = require("./transports/settings.json");

//Transport API
Jethro.prototype.addTransport = function(t, object, name) {
    this.transports[name] = (object);
    for (var i in this.namespaces) {
        if (this.namespaces.hasOwnProperty(i)) {
            this.on(this.namespaces[i], this.transports[name].input.bind(object));
        }
    } return this;
};

Jethro.prototype.removeTransport = function(t, name) {
    for (var i in this.namespaces) {
        if (this.namespaces.hasOwnProperty(i)) {
            this.off(this.namespaces[i], this.transports[name].input);
        }
    } 
    
    this.namespaces[i] = null;
    return this;
};

Jethro.prototype.getTransport = function(transport) {
    if (typeof transport !== "undefined" && transport !== null){
        for (var i in this.transports){
            if (this.transports.hasOwnProperty(i)){
                if (i === transport){
                    return this.transports[i];
                }
            }
        } throw new Error("Transport not found by name");
    } else {
        return this.transports;
    }
};

Jethro.prototype.transportDisabled = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        var arr = {};
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                arr[i] = transport[i].disabled();
            }
        } return arr;
    } else {
        return transport.disabled();
    }
};

Jethro.prototype.transportEnabled = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        var arr = {};
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                arr[i] = transport[i].enabled();
            }
        } return arr;
    } else {
        return transport.enabled();
    }
};

Jethro.prototype._getter = function(t, func) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        var arr = {};
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                arr[i] = transport[i][func]();
            }
        } return arr;
    } else {
        return transport[func]();
    }
};

Jethro.prototype._setter = function(t, func, a, b, c) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i][func](a, b, c);
            }
        }
    } else {
        transport[func]();
    } return this;
};


//Transports
Jethro.prototype.disableTransport = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        throw new Error("Invalid transport");
    } else {
        transport.disable();
    } return this;
};

Jethro.prototype.enableTransport = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        throw new Error("Invalid transport");
    } else {
        transport.enable();
    } return this;
};


// Colour
Jethro.prototype.disableColour = function(t) {
    this._settings.colour.enabled = false;
    return this._setter(t, "disableColour");
};

Jethro.prototype.enableColour = function(t) {
    this._settings.colour.enabled = false;
    return this._setter(t, "enableColour");
};

Jethro.prototype.getColourSettings = function(t) {
    return this._getter(t, "getColourSettings");
};

Jethro.prototype.disableForceColour = function(t) {
    this._settings.colour.force = false;
    return this._setter(t, "disableForceColour");
};

Jethro.prototype.enableForceColour = function(t) {
    this._settings.colour.force = true;
    return this._setter(t, "enableForceColour");
};

Jethro.prototype.disableBoldColour = function(t) {
    this._settings.colour.bold = false;
    return this._setter(t, "disableBoldColour");
};

Jethro.prototype.enableBoldColour = function(t) {
    this._settings.colour.bold = true;
    return this._setter(t, "enableBoldColour");
};


// Whitelist
Jethro.prototype.addToWhitelist = function(t, str) {
    if (typeof str !== "undefined" && this._settings.source.whitelist.indexOf(str) === -1){
        this._settings.source.whitelist.push(str);
    }
    return this._setter(t, "addToWhitelist");
};

Jethro.prototype.removeFromWhitelist = function(t, str) {
    var index = this._settings.source.whitelist.indexOf(str);
    if (index > -1){
        this._settings.source.whitelist.splice(index, 1);
    }
    return this._setter(t, "removeFromWhiteList", str);
};

Jethro.prototype.getWhitelist = function(t) {
    return this._getter(t, "getWhitelist");
};

Jethro.prototype.clearWhitelist = function(t) {
    this._settings.source.whitelist = [];
    return this._setter(t, "clearWhitelist");
};


// Blacklist
Jethro.prototype.addToBlacklist = function(t, str) {
    if (this._settings.source.blacklist.indexOf(str) === -1){
        this._settings.source.blacklist.push(str)
    }
    return this._setter(t, "addToBlacklist", str);
};

Jethro.prototype.removeFromBlacklist = function(t, str) {
    var index = this._settings.source.blacklist.indexOf(str);
    if (index > -1){
        this._settings.source.blacklist.splice(index, 1);
    }
    return this._setter(t, "removeFromBlacklist", str);
};

Jethro.prototype.getBlacklist = function(t) {
    return this._getter(t, "getBlacklist");
};

Jethro.prototype.clearBlacklist = function(t) {
    this._settings.source.blacklist = [];
    return this._setter(t, "disableBoldColour");
};


// Log Level
Jethro.prototype.setLogLevel = function(t, str, value) {
    if (typeof str !== "undefined" && value !== "undefined") {
        if (value === true || value === false) {
            var s = this._settings.severity;
            if (s.indexOf(str) > -1){
                s[str] = value;
                return this._setter(t, "disableBoldColour", str, value);
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
Jethro.prototype.enableTimestamp = function(t) {
    this._settings.timestamp.enabled = true;
    return this._setter(t, "enableTimestamp");
};

Jethro.prototype.disableTimestamp = function(t) {
    this._settings.timestamp.enabled = false;
    return this._setter(t, "disableTimestamp");
};

Jethro.prototype.enableBrackets = function(t) {
    this._settings.timestamp.brackets = true;
    return this._setter(t, "enableBrackets");
};

Jethro.prototype.disableBrackets = function(t) {
    this._settings.timestamp.brackets = false;
    return this._setter(t, "disableBrackets");
};

Jethro.prototype.setTimestampFormat = function(t, data) {
    if (typeof data === "string") {
        this._settings.timestamp.format = data;
        return this._setter(t, "setTimestampFormat", data);
    } else {
        throw new Error("Argument not a string");
    }
};

Jethro.prototype.resetTimestampFormat = function(t) {
    this._settings.timestamp.format = "HH:mm:ss[s] SSS[ms]";
    return this._setter(t, "resetTimestampFormat");
};

Jethro.prototype.enableUTC = function(t) {
    this._settings.timestamp.utc = true;
    return this._setter(t, "enableUTC");
};

Jethro.prototype.disableUTC = function(t) {
    this._settings.timestamp.utc = false;
    return this._setter(t, "disableUTC");
};


//Location
Jethro.prototype.enableLocation = function() {
    this._settings.location.enabled = true;
    return this._setter(t, "enableLocation");
};

Jethro.prototype.disableLocation = function() {
    this._settings.location.enabled = false;
    return this._setter(t, "disableLocation");
};

Jethro.prototype.getLocation = function() {
    return this._getter(t, "getLocation");
};

Jethro.prototype.setLocation = function(str) {
    if (typeof str === "string"){
        this._settings.location.value = str;
        return this._setter(t, "setLocation", str);
    } else {
        throw new Error("Parameter is not a string");
    }
};


//Plugin API
Jethro.prototype.addPlugin = function(object, name) {
    this.plugins[name] = object;
    this.plugins[name].output(this.emit);
    return this;
};

Jethro.prototype.removePlugin = function(name) {
    delete this.plugins[name];
    return this;
};

//Controllers
Jethro.prototype.start = function() {
    for (var i in this.namespaces) {
        for (var j in this.transports) {
            if (this.namespaces.hasOwnProperty(i)) {
                if (this.namespaces[i] !== null) {
                    if (this.transports.hasOwnProperty(j)) {
                        this.on(this.namespaces[i], this.transports[j].input.bind(this.transports[j]));
                    }
                }
            }
        }
    } return this;
};

Jethro.prototype.stop = function() {
    for (var i in this.namespaces) {
        for (var j in this.transports) {
            if (this.namespaces.hasOwnProperty(i)) {
                if (this.namespaces[i] !== null) {
                    if (this.transports.hasOwnProperty(j)) {
                        this.off(this.namespaces[i], this.transports[j].input.bind(this.transports[j]));
                    }
                }
            }
        }
    } return this;
};

//Inputs
/* Input Methods
 * - Info
 * - Transport
 * - Debug
 * - Success
 * - Warn
 * - Error
 */
var Inputs = require('./inputs.js');

//Standard Method
Jethro.prototype.log = require('./logger.js');
Jethro.prototype.direct = Inputs.direct;
Jethro.prototype.output = Inputs.direct;

//Severity
Jethro.prototype.info = Inputs.info;
Jethro.prototype.transport = Inputs.transport;
Jethro.prototype.debug = Inputs.debug;
Jethro.prototype.success = Inputs.success;
Jethro.prototype.warn = Inputs.warn;
Jethro.prototype.warning = Jethro.prototype.warn;
Jethro.prototype.error = Inputs.error;
Jethro.prototype.fatal = Inputs.fatal;

//Default logger instance
var logger = new Jethro();

module.exports = Jethro;
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
module.exports.start = logger.start.bind(logger);
module.exports.stop = logger.stop.bind(logger);

//Transport methods
module.exports.addTransport = logger.addTransport.bind(logger);
module.exports.removeTransport = logger.removeTransport.bind(logger);
module.exports.disableTransport = logger.disableTransport.bind(logger);
module.exports.enableTransport = logger.enableTransport.bind(logger);
module.exports.getTransport = logger.getTransport.bind(logger);

module.exports.transportDisabled = logger.transportDisabled.bind(logger);
module.exports.transportEnabled = logger.transportEnabled.bind(logger);
module.exports.disableColour = logger.disableColour.bind(logger);
module.exports.enableColour = logger.enableColour.bind(logger);
module.exports.getColourSettings =  logger.getColourSettings.bind(logger);
module.exports.disableForceColour = logger.disableForceColour.bind(logger);
module.exports.enableForceColour = logger.enableForceColour.bind(logger);
module.exports.disableBoldColour = logger.disableBoldColour.bind(logger);
module.exports.enableBoldColour = logger.enableBoldColour.bind(logger);
module.exports.addToWhitelist = logger.addToBlacklist.bind(logger);
module.exports.removeFromWhitelist = logger.removeFromWhitelist.bind(logger);
module.exports.getWhitelist = logger.getWhitelist.bind(logger);
module.exports.clearWhitelist = logger.clearWhitelist.bind(logger);
module.exports.addToBlacklist = logger.addToBlacklist.bind(logger);
module.exports.removeFromBlacklist = logger.removeFromBlacklist.bind(logger);
module.exports.getBlacklist = logger.getBlacklist.bind(logger);
module.exports.clearBlacklist = logger.clearBlacklist.bind(logger);
module.exports.setLogLevel = logger.setLogLevel.bind(logger);
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