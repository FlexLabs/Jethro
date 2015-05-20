var Logger = require('../logger.js');

var express = function(req, res, next) {
    req._startTime = new Date();

    var end = res.end;
    res.end = function(chunk, encoding) {
        var m = req.method;
        var n = res.statusCode;
        var code = n.toString();
        var level;
        var ip = req.headers['x-forwarded-for'] || req.headers['X-Real-IP'] || req.connection.remoteAddress;

        res.responseTime = new Date() - req._startTime;

        res.end = end;
        res.end(chunk, encoding);


        //Colour StatusCode
        if (n >= 500) {
            level = 'error';
            code = code.red.bold;
        } else if (n >= 400) {
            level = 'warning';
            code = code.yellow.bold;
        } else if (n >= 300){
            level = 'info';
            code = code.cyan.bold;
        } else if (n >= 100) {
            level = 'info';
            code = code.green.bold;
        }

        //Colour Method
        if (m === "POST" || m === "PUT"){
            level = 'info';
            m = m.yellow.bold;
        } else if (m === "DELETE"){
            level = 'warning';
            m = m.red.bold;
        } else if (m === "GET"){
            level = 'info';
            m = m.info;
        } else {
            level = 'info';
            m = m.green.bold;
        }



        Logger(level, 'Express', ip + '     ' + code + ' ' + m + '  ' + req.headers.host + '    --> ' + req.originalUrl + ' ' + res.responseTime + ' ms ');

    };
    next();
};

module.exports = express;