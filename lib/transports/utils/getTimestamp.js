var formatTimestamp = require('./formatTimestamp.js');

module.exports = function(data, settings) {
    var f = "";
    if (settings.timestamp.enabled === true) {
        if (typeof data.timestamp !== "undefined") {
            if (typeof settings.timestamp.format !== "undefined" && settings.timestamp.format !== "undefined") {
                try {
                    f = moment().format(settings.timestamp.format);
                } catch (e) {
                    f = moment().format('DD MMM HH:mm:ss');
                }
            } else {
                f = formatTimestamp(data.timestamp, settings.timestamp.utc === true);
            }
        } else {
            f = formatTimestamp(new Date(), settings.timestamp.utc === true);
        }

        if (settings.timestamp.brackets === true) {
            return "[" + f + "] ";
        } else {
            return f + " ";
        }
    }
};