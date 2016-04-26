var util = require("util");
var uuid = require("uuid-v4");
var EventEmitter = require("eventemitter3");
var JethroConsole = require('./transports/console.js');
var Transport = require('./transports/index.js');

function Jethro(a, b, c) {
	if (!(this instanceof Jethro)) {
        return logger.log(a, b, c);
	}

    this.id = uuid();

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

Jethro.prototype.getId = function(){
    return this.id;
};

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

Jethro.prototype.disableTransport = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].disable();
            }
        }
    } else {
        transport.disable();
    } return this;
};

Jethro.prototype.enableTransport = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].enable();
            }
        }
    } else {
        transport.enable();
    } return this;
};

Jethro.prototype.getTransport = function(t) {
    if (typeof transport !== "undefined" && transport !== null){
        for (var i in this.transports){
            if (this.transport.hasOwnProperty(i)){
                if (i === transport){
                    return this.transport[i];
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


// Colour
Jethro.prototype.disableColour = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].disableColour();
            }
        }
    } else {
        transport.disableColour();
    } return this;
};

Jethro.prototype.enableColour = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].enableColour();
            }
        }
    } else {
        transport.enableColour();
    } return this;
};

Jethro.prototype.getColourSettings = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        var arr = {};
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                arr[i] = transport[i].getColourSettings();
            }
        } return arr;
    } else {
        return transport.getColourSettings();
    }
};

Jethro.prototype.disableForceColour = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].disableForceColour();
            }
        }
    } else {
        transport.disableForceColour();
    } return this;
};

Jethro.prototype.enableForceColour = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].enableForceColour();
            }
        }
    } else {
        transport.enableForceColour();
    } return this;
};

Jethro.prototype.disableBoldColour = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].disableBoldColour();
            }
        }
    } else {
        transport.disableBoldColour();
    } return this;
};

Jethro.prototype.enableBoldColour = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].enableBoldColour();
            }
        }
    } else {
        transport.enableBoldColour();
    } return this;
};


// Whitelist
Jethro.prototype.addToWhitelist = function(t, str) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].addToWhitelist(str);
            }
        }
    } else {
        transport.addToWhitelist(str);
    } return this;
};

Jethro.prototype.removeFromWhitelist = function(t, str) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].removeFromWhitelist(str);
            }
        }
    } else {
        transport.removeFromWhitelist(str);
    } return this;
};

Jethro.prototype.getWhitelist = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        var arr = {};
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                arr[i] = transport[i].getWhitelist();
            }
        } return arr;
    } else {
        return transport.getWhitelist();
    }
};

Jethro.prototype.clearWhitelist = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].clearWhitelist();
            }
        }
    } else {
        transport.clearWhitelist();
    } return this;
};


// Blacklist
Jethro.prototype.addToBlacklist = function(t, str) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].addToBlacklist(str);
            }
        }
    } else {
        transport.addToBlacklist(str);
    } return this;
};

Jethro.prototype.removeFromBlacklist = function(t, str) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].removeFromBlacklist(str);
            }
        }
    } else {
        transport.removeFromBlacklist(str);
    } return this;
};

Jethro.prototype.getBlacklist = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        var arr = {};
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                arr[i] = transport[i].getBlacklist();
            }
        } return arr;
    } else {
        return transport.getBlacklist();
    }
};

Jethro.prototype.clearBlacklist = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].clearBlacklist();
            }
        }
    } else {
        transport.clearBlacklist();
    } return this;
};


// Log Level
Jethro.prototype.setLogLevel = function(t, str, value) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        var arr = {};
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                arr[i] = transport[i].setLogLevel(str, value);
            }
        } return arr;
    } else {
        return transport.setLogLevel(str, value);
    }
};


// Timestamp
Jethro.prototype.enableTimestamp = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].enableTimestamp();
            }
        }
    } else {
        transport.enableTimestamp();
    } return this;
};

Jethro.prototype.disableTimestamp = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].disableTimestamp();
            }
        }
    } else {
        transport.disableTimestamp();
    } return this;
};

Jethro.prototype.enableBrackets = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].enableBrackets();
            }
        }
    } else {
        transport.enableBrackets();
    } return this;
};

Jethro.prototype.disableBrackets = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].disableBrackets();
            }
        }
    } else {
        console.log(transports);
        transport.disableBrackets();
    } return this;
};

Jethro.prototype.setTimestampFormat = function(t, data) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        var arr = {};
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                arr[i] = transport[i].setTimestampFormat(data);
            }
        } return arr;
    } else {
        return transport.setTimestampFormat(data);
    }
};

Jethro.prototype.enableUTC = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].enableUTC();
            }
        }
    } else {
        transport.enableUTC();
    } return this;
};

Jethro.prototype.disableUTC = function(t) {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].disableUTC();
            }
        }
    } else {
        transport.disableUTC();
    } return this;
};

//Location
Jethro.prototype.enableLocation = function() {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].enableLocation();
            }
        }
    } else {
        transport.enableLocation();
    } return this;
};

Jethro.prototype.disableLocation = function() {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                transport[i].disableLocation();
            }
        }
    } else {
        transport.disableLocation();
    } return this;
};

Jethro.prototype.getLocation = function() {
    var transport = this.getTransport(t);
    if (!(transport instanceof Transport)){
        var arr = {};
        for (var i in transport){
            if (transport.hasOwnProperty(i)){
                arr[i] = transport[i].getLocation();
            }
        } return arr;
    } else {
        return transport.getLocation();
    }
};

Jethro.prototype.setLocation = function(str) {
    if (typeof str === "string") {
        this.location = str;
        var transport = this.getTransport(t);
        if (!(transport instanceof Transport)) {
            for (var i in transport) {
                if (transport.hasOwnProperty(i)) {
                    transport[i].setLocation(str);
                }
            }
        } else {
            transport.setLocation(str);
        }
        return this;
    } else {
        throw new Error("Parameter not a string");
    }
};


//Plugin API
Jethro.prototype.addPlugin = function(object, name) {
    this.plugins[name] = object;
    this.plugins[name].output(this.emit);
    return this;
};

Jethro.prototype.removePlugin = function(name) {
    this.plugins[name] = null;
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
module.exports.enableUTC = logger.enableUTC.bind(logger);
module.exports.disableUTC =  logger.disableUTC.bind(logger);

//Event Emitter Methods
module.exports.on = logger.on.bind(logger);
module.exports.off = logger.off.bind(logger);
module.exports.emit = logger.emit.bind(logger);