var moment = require("moment");

module.exports = function(data, settings) {
    var f = "";
    if (settings.timestamp.enabled === true) {
        var date = data.timestamp || new Date();
        f = settings.timestamp.utc
            ? moment(date.toISOString()).utc().format(settings.timestamp.format)
            : moment(date.toISOString()).format(settings.timestamp.format);
        if (settings.timestamp.brackets === true) {
            return "[" + f + "] ";
        } else {
            return f + " ";
        }
    } else {
        return f;
    }
};