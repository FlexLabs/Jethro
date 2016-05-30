var Transport = require('./../index.js');

var util = require('util');
var fs = require("fs");
var moment = require("moment");

/**
 * Constructor for saving to file
 * @constructor
 * @augments Transport
 * @returns {File}
 */
function File() {
    Transport.call(this);

    /**
     *
     * @type {String}
     */
    this.path = __dirname;

    /**
     *
     * @type {string}
     */
    this.fileNameFormat = "YYYY-MM-DD";

    /**
     *
     * @type {string}
     */
    this.fileExtension = ".txt";

    return this;
}

util.inherits(File, Transport);

/**
 * Output function, logs to file
 * @param {object} data
 */
File.prototype.output = function(data) {
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
File.prototype.getFilePath = function() {
    return this.path;
};

/**
 * Sets the file path for
 * @param {string} str - File path to log to
 * @returns {File}
 */
File.prototype.setFilePath = function(str) {
    if (typeof str === "string") {
        this.path = str;
        return this;
    } else {
        throw new Error("Not a string");
    }
};

module.exports = File;