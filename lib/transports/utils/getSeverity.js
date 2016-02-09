module.exports = function(data) {
    var severity;
    if (typeof data.severity !== "undefined") {
        severity = "[" + this._getSeverityColour(this._capitalise(data.severity)) + "]";
    } else {
        severity = "[undefined]";
    }
    return this._spaceOut(severity, 12);
};