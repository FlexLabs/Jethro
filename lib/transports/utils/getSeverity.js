var capitalise = require('./capitalise.js');
var getSeverityColour = require('./getSeverityColour.js');
var spaceOut = require('./spaceOut.js');

module.exports = function(data, settings) {
    var severity;
    if (typeof data.severity !== "undefined") {
        severity = "[" + getSeverityColour(capitalise(data.severity), settings) + "]";
    } else {
        severity = "[undefined]";
    }
    return spaceOut(severity, 12);
};