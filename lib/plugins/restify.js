var logger = require('../logger.js');

var restify = function(req, res, app){
    var level, v;
    var m = req.method;
    var n = res.statusCode;
    var code = n.toString();
    var rs = new Date() - req.time();

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

    var IP = req.connection.remoteAddress;
    if (IP.substr(0, 3) == "::1"){
        IP = "127.0.0.1";
    } else if (IP.substr(0, 7) === "::ffff:"){
        IP = IP.substr(7);
    }

    var sp = 15-IP.length;
    for(var i = 0; i< sp; i++) {
        IP += ' ';
    }

    var host = req.headers.host;
    var sp_2 = 20-host.length;
    for(var j = 0; j< sp_2; j++) {
        host += ' ';
    }

    var version = "["+res.version+"]";
    var sp_3 = 9-version.length;
    for(var k = 0; k< sp_3; k++) {
        version += ' ';
    }

    logger(level, 'Restify', IP + ' ' + code + ' ' + m + '  ' + host + ' '+version+' --> ' + req.url + ' ' + rs + ' ms ');
};

module.exports = restify;
