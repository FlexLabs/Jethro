var util = require("util");
var EventEmitter = require("eventemitter3");
var JethroConsole = require('./transports/console.js');

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

//API
Jethro.prototype.addTransport = function(object, name){
    this.transports[name] = (object);
    for (var i in this.namespaces){
        if (this.namespaces.hasOwnProperty(i)) {
            this.on(this.namespaces[i], this.transports[name].input.bind(object));
        }
    }
};

//Controllers

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

//Standard Method
Jethro.prototype.log = require('./logger.js');

Jethro.prototype.info = function(source, message, timestamp){
    this.log("info", source, message, timestamp);
};

Jethro.prototype.transport = function(source, message, timestamp){
    this.log("transport", source, message, timestamp);
};

Jethro.prototype.debug = function(source, message, timestamp){
    this.log("debug", source, message, timestamp);
};

Jethro.prototype.success = function(source, message, timestamp){
    this.log("success", source, message, timestamp);
};

Jethro.prototype.warn = function(source, message, timestamp){
    this.log("warning", source, message, timestamp);
};

//Legacy
Jethro.prototype.warning = Jethro.prototype.warn;

Jethro.prototype.error = function(source, message, timestamp){
    this.log("error", source, message, timestamp);
};

Jethro.prototype.fatal = function(source, message, timestamp){
    this.log("error", source, message, timestamp);
    //throw new Error(source + ": " + message);
};

Jethro.prototype.direct = function(data){
    if (typeof data !== "undefined"){
        this.log(data.severity, data.source, data.message, data.timestamp);
    } else {
        throw new Error("Missing data parameter.");
    }
};

module.exports = Jethro;
module.exports.Transport = require('./transports/index.js');