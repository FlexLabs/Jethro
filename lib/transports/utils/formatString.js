var chalk = require('./chalk.js');
var util = require('util');

var getTimestamp = require('./getTimestamp.js');
var getSeverity = require('./getSeverity.js');
var getSource = require('./getSource.js');
var getMessage = require('./getMessage.js');

module.exports = function(data) {
    var settings = this._settings;
    if (typeof data === "object") {
        var a = getTimestamp(data, settings);
        var b = getSeverity(data, settings);
        var c = getSource(data, settings);
        var d = getMessage(data, settings);
        var output = (a + b + c + " " + d + "   ");
        if (settings.colour === false) {
            output = chalk.stripColor(output);
        } return output;
    } else {
        throw new Error("A non-object was sent to the Logger.output() function! See: " + util.inspect(data));
    }
};