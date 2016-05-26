var HttpServer = require("../defaults/http.js");
var util = require("util");

/**
 *
 * @returns {Express}
 * @constructor
 * @augments {Plugin}
 */
function Express() {
    HttpServer.call(this);
    return this;
}

util.inherits(Express, HttpServer);

/**
 *
 * @returns {log}
 */
Express.prototype.input = function() {
    var self = this;
    return function log(req, res, next) {
        var startTime = new Date();

        var end = res.end;
        res.end = function(chunk, encoding) {

            res.end = end;
            res.end(chunk, encoding);


            self.format({
                ip: req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.connection.remoteAddress || "0.0.0.0",
                host: req.headers.host,
                route: req.originalUrl,
                method: req.method,
                statusCode: res.statusCode,
                responseTime: new Date() - startTime
            }, function(severity, message) {
                self.log(severity, "Express", message)
            });
        };
        next();
    }
};

module.exports = Express;