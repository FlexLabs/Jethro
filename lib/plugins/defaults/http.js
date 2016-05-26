var Plugin = require("../index.js");
var util = require("util");

var chalk = require("chalk");

/**
 * @private
 * @type {chalk.constructor}
 */
var forceChalk = new chalk.constructor({
    enabled: true
});

/**
 *
 * @returns {HttpServer}
 * @constructor
 * @augments {Plugin}
 */
function HttpServer() {
    Plugin.call(this);
    return this;
}

util.inherits(HttpServer, Plugin);

/**
 *
 * @param data
 * @param data.ip
 * @param data.host
 * @param data.route
 * @param data.method
 * @param data.statusCode
 * @param data.responseTime
 * @param callback
 * @returns {function} callback
 */
HttpServer.prototype.format = function(data, callback) {
    var ip = this.spaceOut((data.ip.substr(0, 3) == "::1"
                ? "127.0.0.1" : data.ip.substr(0, 7) === "::ffff:"
                ? data.ip.substr(7) : data.ip
        ), 18
    );

    var methods = {
        "DELETE" : "red",
        "GET" : "green",
        "OPTIONS": "cyan",
        "PATCH": "magenta",
        "POST": "yellow",
        "PUT": "magenta"
    };

    var method = this.spaceOut(forceChalk[methods[data.method]].bold(data.method), 8);
    var route = this.spaceOut(data.host + data.route, 50);
    var responseTime = data.responseTime < 50
        ? forceChalk.green.bold(data.responseTime + " ms")
        : data.responseTime < 250
        ? forceChalk.yellow.bold(data.responseTime + " ms")
        : forceChalk.red.bold(data.responseTime + " ms");

    var level, code;
    if (data.statusCode >= 500) {
        level = "error";
        code = forceChalk.red.bold("" + data.statusCode);
    } else if (data.statusCode >= 400) {
        level = "warning";
        code = forceChalk.yellow.bold("" + data.statusCode);
    } else if (data.statusCode >= 300) {
        level = "info";
        code = forceChalk.cyan.bold("" + data.statusCode);
    } else if (data.statusCode >= 100) {
        level = "info";
        code = forceChalk.green.bold("" + data.statusCode);
    }

    callback(level, ip + this.spaceOut(code, 6) + method + route + " " + responseTime);
};

module.exports = HttpServer;