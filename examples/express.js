var express = require('express');
var app = express();

var Jethro = require('../lib/index.js');
var logger = new Jethro();
var expressLog = new Jethro.Express();
logger.addPlugin("express", expressLog);
app.use(expressLog.input());

app.get('/', function(req, res) {
    res.send('hello world');
});

app.listen(3000);

var path = require("path");
var jethroFile = new Jethro.File();
jethroFile.setFilePath(path.join(__dirname, 'logs'));
//jethroFile.setFilenameFormat("");
logger.addTransport("file", jethroFile);


//logger.fatal(new Error("Test"));