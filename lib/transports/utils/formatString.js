var chalk = require('chalk');
var util = require('util');

var getTimestamp = require('./getTimestamp.js');
var getSeverity = require('./getSeverity.js');
var getSource = require('./getSource.js');
var getMessage = require('./getMessage.js');

module.exports = function(data) {
    var settings = this._settings;
    if (typeof data === "object") {
        var timestamp = getTimestamp(data, settings);
        var severity = getSeverity(data, settings);
        var source = getSource(data, settings);
        var message = getMessage(data, settings);
        var output = (timestamp + severity + source + message);
        if (settings.colour.enabled === false) {
            output = chalk.stripColor(output);
        } return output;
    } else {
        throw new Error("A non-object was sent to the Logger.output() function! See: " + util.inspect(data));
    }
};