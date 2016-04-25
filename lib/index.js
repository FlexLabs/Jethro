var util = require("util");
var uuid = require("uuid-v4");
var EventEmitter = require("eventemitter3");
var JethroConsole = require('./transports/console.js');


function Jethro(a, b, c) {
	if (!(this instanceof Jethro)){
        logger(a, b, c);
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

//Transport API
Jethro.prototype.addTransport = function(object, name) {
    this.transports[name] = (object);
    for (var i in this.namespaces) {
        if (this.namespaces.hasOwnProperty(i)) {
            this.on(this.namespaces[i], this.transports[name].input.bind(object));
        }
    }
};

Jethro.prototype.removeTransport = function(name) {
    for (var i in this.namespaces) {
        if (this.namespaces.hasOwnProperty(i)) {
            this.off(this.namespaces[i], this.transports[name].input);
        }
    } this.namespaces[i] = null;
};

//Plugin API
Jethro.prototype.addPlugin = function(object, name){
    this.plugins[name] = object;
    this.plugins[name].output(this.emit);
};

Jethro.prototype.removePlugin = function(name){
    this.plugins[name] = null;
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
    }
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
    }
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

module.exports = Jethro;
module.exports.Transport = require('./transports/index.js');

//Default logger instance
var logger = new Jethro();

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
module.exports.addTransport = logger.addTransport.bind(logger);
module.exports.removeTransport = logger.removeTransport.bind(logger);
module.exports.addPlugin = logger.addPlugin.bind(logger);
module.exports.removePlugin = logger.removePlugin.bind(logger);
module.exports.start = logger.start.bind(logger);
module.exports.stop = logger.stop.bind(logger);

//Event Emitter Methods
module.exports.on = logger.on.bind(logger);
module.exports.off = logger.off.bind(logger);
module.exports.emit = logger.emit.bind(logger);
