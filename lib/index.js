var util = require("util");
var EventEmitter = require("eventemitter3");

function Jethro(){
    this.start();
}

util.inherits(Jethro, EventEmitter);

Jethro.prototype.log = require('./core/logger.js');
Jethro.prototype.output = require('./core/output.js');
Jethro.prototype.utils = require('./utils/index.js');
Jethro.prototype.settings = require('./settings.json');

Jethro.prototype.start = function(){
    this.on("logger", this.input);
};

Jethro.prototype.stop = function(){
    this.off("logger", this.input);
};

Jethro.prototype.input = function(data){
    if (this.settings.output.console === true) {
        this.output(data);
    }
};

module.exports = Jethro;