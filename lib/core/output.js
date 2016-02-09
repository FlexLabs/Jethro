//Node Modules
var util = require('util');
var moment = require('moment');
var chalk = require('../chalk');

module.exports = function(data, callback) {
    if (typeof data === "object") {
        var self = this;
        var a = getTimestamp(data, self);
        var b = getSeverity(data, self);
        var c = getSource(data, self);
        var d = getMessage(data);
        var output = (a + b + c + " " + d + "   ");
        if (this.settings.output.colour === false) {
            output = chalk.stripColor(output);
        } if (typeof callback !== "undefined") {
            callback(output);
        } else {
            console.log(output);
        }
    } else {
        throw new Error("A non-object was sent to the Logger.output() function! See: " + util.inspect(data));
    }
};

var getTimestamp = function(data, self) {
    var f = "";
    if (self.settings.output.timestamp === true) {
        if (typeof data.timestamp !== "undefined") {
            if (typeof self.settings.timeformat !== "undefined" && self.settings.timeformat !== "undefined") {
                try {
                    f = moment().format(self.settings.timeformat);
                } catch (e) {
                    f = moment().format('DD MMM HH:mm:ss');
                }
            } else {
                f = self.utils.formatTimestamp(data.timestamp, self.settings.output.timestampOpts.utc === true);
            }
        } else {
            f = self.utils.formatTimestamp(new Date(), self.settings.output.timestampOpts.utc === true);
        }

        if (self.settings.output.timestampOpts.brackets === true) {
            return "[" + f + "] ";
        } else {
            return f + " ";
        }
    }
};

var getSeverity = function(data, self) {
    var severity;
    if (typeof data.severity !== "undefined") {
        severity = "[" + getSeverityColour(self.utils.capitalise(data.severity)) + "]";
    } else {
        severity = "[undefined]";
    }
    return self.utils.spaceOut(severity, 12);
};

var getSeverityColour = function(s){
    switch (s.toLowerCase()) {
        case 'success':     return chalk.success(s);
        case 'transport':   return chalk.transport(s);
        case 'debug':       return chalk.debug(s);
        case 'info':        return chalk.info(s);
        case 'warning':     return chalk.warning(s);
        case 'error':       return chalk.error(s);
        default:            return s;
    }
};

var getSource = function(data, self) {
    var source;
    if (typeof data.source !== "undefined"){
        source = "[" + data.source + "]";
    } else {
        source = "[undefined]";
    } return self.utils.spaceOut(source, 15);
};

var getMessage = function(data) {
    if (typeof data.message === "string") {
        return data.message;
    } else {
        return util.inspect(data.message);
    }
};
