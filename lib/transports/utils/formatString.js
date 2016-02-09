var chalk = require('./../chalk.js');
var util = require('util');

module.exports = function(data) {
    if (typeof data === "object") {
        var a = this._getTimestamp(data);
        var b = this._getSeverity(data);
        var c = this._getSource(data);
        var d = this._getMessage(data);
        var output = (a + b + c + " " + d + "   ");
        if (this._settings.colour === false) {
            output = chalk.stripColor(output);
        } return output;
    } else {
        throw new Error("A non-object was sent to the Logger.output() function! See: " + util.inspect(data));
    }
};