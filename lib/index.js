var util = require("util");
var EventEmitter = require("eventemitter3");
var JethroConsole = require('./transports/modules/console/index.js');

function Jethro(){
    this.namespaces = [
        "logger"
    ];
    this.transports = {
        "console": new JethroConsole()
    };
    this.start();
}

util.inherits(Jethro, EventEmitter);

Jethro.prototype.log = require('./logger.js');

Jethro.prototype.addTransport = function(object, name){
    this.transports[name] = (object);
    for (var i in this.namespaces){
        if (this.namespaces.hasOwnProperty(i)) {
            this.on(this.namespaces[i], this.transports[name].input.bind(object));
        }
    }
    console.log(this.transports[name]);
    console.log(this.listeners("logger", this.transports["console"]));
};

Jethro.prototype.start = function(){
    for (var i in this.namespaces) {
        for (var j in this.transports) {
            if (this.namespaces.hasOwnProperty(i)) {
                if (this.transports.hasOwnProperty(j)) {
                    this.on(this.namespaces[i], this.transports[j].input.bind(this.transports[j]));
                }
            }
        }
    }
};

Jethro.prototype.stop = function(){
    for (var i in this.namespaces) {
        for (var j in this.transports) {
            if (this.namespaces.hasOwnProperty(i)) {
                if (this.transports.hasOwnProperty(j)) {
                    this.off(this.namespaces[i], this.transports[j].input.bind(this.transports[j]));
                }
            }
        }
    }
};

/* Input Methods
 * - Info
 * - Transport
 * - Debug
 * - Success
 * - Warn
 * - Error
 */

Jethro.prototype.info = function(source, message, timestamp){
    this.log("info", message, timestamp);
};

Jethro.prototype.transport = function(source, message, timestamp){
    this.log("info", message, timestamp);
};

Jethro.prototype.debug = function(source, message, timestamp){
    this.log("info", message, timestamp);
};

Jethro.prototype.success = function(source, message, timestamp){
    this.log("info", message, timestamp);
};

Jethro.prototype.warn = function(source, message, timestamp){
    this.log("info", message, timestamp);
};

Jethro.prototype.error = function(source, message, timestamp){
    this.log("info", message, timestamp);
};

Jethro.prototype.fatal = function(source, message, timestamp){
    console.error(this.log("info", message, timestamp));
};

module.exports = Jethro;
module.exports.Transport = require('./transports/index.js');