# Jethro Plugins [![Build Status](https://travis-ci.org/JethroLogger/Jethro.svg?branch=master)](https://travis-ci.org/JethroLogger/Jethro) [![npm version](http://img.shields.io/npm/v/jethro.svg)](https://npmjs.org/package/jethro) [![npm downloads](http://img.shields.io/npm/dm/jethro.svg)](https://npmjs.org/package/jethro) [![Gratipay](http://img.shields.io/gratipay/Hunchmun.svg)](https://www.gratipay.com/Hunchmun/)

Restify Logger
--------------

Quick start:

```js

var logger = require('jethro');


//At the end of the file
server.on('after', logger.restify);
```

![Screenshot](/docs/v2/plugins/restify.png "Screenshot")



Functional Example
------------------

```js

var restify = require('restify');
var logger = require('jethro');
var server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/echo/:name', function (req, res, next) {
    res.send(req.params);
    return next();
});

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});

server.get('/', function (request, response, next) {
    response.send('It worked!');
    next();
});

server.on('after', logger.restify);

```