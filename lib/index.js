var util = require("util");
var EventEmitter = require("eventemitter3");
var JethroConsole = require('./transports/console.js');

function Jethro() {
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