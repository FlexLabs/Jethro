var spaceOut = require('./spaceOut.js');

module.exports = function(data) {
    var source;
    if (typeof data.source !== "undefined"){
        source = "[" + data.source + "]";
    } else {
        source = "[undefined]";
    } return spaceOut(source, 15);
};