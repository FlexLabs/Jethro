module.exports = function(data) {
    var source;
    if (typeof data.source !== "undefined"){
        source = "[" + data.source + "]";
    } else {
        source = "[undefined]";
    } return this._spaceOut(source, 15);
};