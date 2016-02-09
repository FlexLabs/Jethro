module.exports = function(data) {
    var f = "";
    if (this._settings.timestamp.enabled === true) {
        if (typeof data.timestamp !== "undefined") {
            if (typeof this._settings.timestamp.format !== "undefined" && this._settings.timestamp.format !== "undefined") {
                try {
                    f = moment().format(this._settings.timestamp.format);
                } catch (e) {
                    f = moment().format('DD MMM HH:mm:ss');
                }
            } else {
                f = this._formatTimestamp(data.timestamp, this._settings.timestamp.utc === true);
            }
        } else {
            f = this._formatTimestamp(new Date(), this._settings.timestamp.utc === true);
        }

        if (this._settings.timestamp.brackets === true) {
            return "[" + f + "] ";
        } else {
            return f + " ";
        }
    }
};