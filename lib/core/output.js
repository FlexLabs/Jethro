//Node Modules
var util = require('util');
var moment = require('moment');
var stripColorCodes = require('stripcolorcodes');

module.exports = function(data, callback) {
    if (typeof data === "object") {
        var self = this;
        var a = getTimestamp(data, self) || "";
        var b = getSeverity(data, self);
        var c = getSource(data);
        var d = getMessage(data);

        var output = (a + b + c + " " + d + "   ");

        if (this.settings.output.colour === false) {
            output = stripColorCodes(output);
        }

        if (typeof callback !== "undefined") {
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
    if (typeof data.severity !== "undefined") {
        var h = self.utils.capitalise(data.severity);
        switch (data.severity.toLowerCase()) {
            case 'success':
                return "[" + h.success + "]   ";
                break;
            case 'transport':
                return "[" + h.transport + "] ";
                break;
            case 'debug':
                return "[" + h.debug + "]     ";
                break;
            case 'info':
                return "[" + h.info + "]      ";
                break;
            case 'warning':
                return "[" + h.warning + "]   ";
                break;
            case 'error':
                return "[" + h.error + "]     ";
                break;
            default:
                return "[" + h + "]     ";
        }
    } else {
        return "[" + "undefined".error + "]      ";
    }
};

var getSource = function(data) {
    if (typeof data.source !== "undefined"){
        var source = "[" + data.source + "]";
        var sp = 15-source.length;
        for(var i = 0; i< sp; i++) {
            source += ' ';
        } return source;
    } else {
        return "[" + "undefined" + "]	";
    }
};

var getMessage = function(data) {
    if (typeof data.message !== "undefined") {
        return data.message;
    } else {
        return "undefined".error;
    }
};