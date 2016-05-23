var Transport = require('./../index.js');

var util = require('util');
var fs = require("fs");
var moment = require("moment");

/**
 * Constructor for saving to file
 * @constructor
 * @augments Transport
 */
function JethroFile() {
    Transport.call(this);
    this.path = __dirname;
    this.fileNameFormat = "YYYY-MM-DD";
    this.fileExtension = ".txt";
}

util.inherits(JethroFile, Transport);

/**
 * Output function, logs to file
 * @param {object} data
 */
JethroFile.prototype.output = function(data) {
    this.disableColour(); //Enforcing disable colour for this transport
    var output = this.formatString(data);
    var name = moment(data.timestamp).format(this.fileNameFormat) + this.fileExtension;
    var path = this.path + "/" + name;
    fs.appendFileSync(path, output + "\r\n");
};

/**
 * Returns the set file path
 * @returns {null|string} File path
 */
JethroFile.prototype.getFilePath = function(){
    return this.path;
};

/**
 * Sets the file path for
 * @param {string} str - File path to log to
 * @returns {JethroFile}
 */
JethroFile.prototype.setFilePath = function(str){
    this.path = str;
    return this;
};

module.exports = JethroFile;