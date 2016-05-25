var Plugin = require("../index.js");
var util = require("util");

/**
 *
 * @returns {Express}
 * @constructor
 * @augments {Plugin}
 */
function Express() {
    Plugin.call(this);
    return this;
}

util.inherits(Express, Plugin);

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Express}
 */
Express.prototype.input = function(req, res, next) {
    var self = this;
    req._startTime = new Date();

    var end = res.end;
    res.end = function(chunk, encoding) {
        self.log(req.ip);
    };
    next();
    return this;
};

module.exports = Express;