"use strict";

var expect = require("unexpected");
var Jethro = require("../");
var logger = new Jethro();
var request = require("supertest");
var stdout = require("test-console").stdout;
var defaultSet = function() {
    logger.importSettings('console',{
        "location": "undefined",
        "timeformat": "undefined",
        "output": {
            "source": {
                "whitelist": [],
                "blacklist": []
            },
            "colour": true,
            "timestamp": true,
            "console": true,
            "timestampOpts": {
                "brackets": false,
                "utc": false
            }
        }
    });
};
var expressLog = new Jethro.Express();
logger.addPlugin('express', expressLog);
var express = require("express");
var response = function(req, res) {
    return res.send("Testing");
};
var app = express();

app.use(expressLog.input());
app.delete("/", response);
app.get("/", response);
app.options("/", response);
app.post("/", response);
app.get("/info", function(req, res) {
    return res.status(101).send("Testing");
});
app.get("/nope", function(req, res) {
    return res.status(404).send("Testing");
});
app.get("/error", function(req, res) {
    return res.status(500).send("Testing");
});
app.get("/redirect", function(req, res) {
    return res.status(302).send("Testing");
});
app.listen(3000);

describe("Plugin instance Test", function() {
    it("Should throw that input hasn't been overriden", function() {
        expect(function() {
            var plugin = new Jethro.Plugin();

            plugin.input();
        }, "to throw", new Error("Input function not overwritten!"));
    });
});
describe("Express Plugin Test", function() {
    beforeEach(defaultSet);
    it("Should log 127.0.0.2 for x-real-ip", function(done) {
        var inspect = stdout.inspect();
        request(app)
            .get("/")
            .set("x-real-ip", "127.0.0.2")
            .end(function() {
                inspect.restore();
                expect(inspect.output[0], "to contain", "[Express]       127.0.0.2         \x1b[32m\x1b[1m200\x1b[22m\x1b[39m   \x1b[32m\x1b[1mGET\x1b[22m\x1b[39m");
                return done();
            });
    });

    it("Should log requests", function(done) {
        var inspect = stdout.inspect();

        request(app)
            .get("/")
            .end(function() {
                inspect.restore();
                expect(inspect.output[0], "to contain", "[\x1b[35m\x1b[1mInfo\x1b[22m\x1b[39m]      [Express]       127.0.0.1         \x1b[32m\x1b[1m200\x1b[22m\x1b[39m   \x1b[32m\x1b[1mGET\x1b[22m\x1b[39m");
                return done();
            });
    });

    it("Should set level to warning for DELETE", function(done) {
        var inspect = stdout.inspect();

        request(app)
            .delete("/")
            .end(function() {
                inspect.restore();
                expect(inspect.output[0], "to contain", "[\x1b[35m\x1b[1mInfo\x1b[22m\x1b[39m]      [Express]       127.0.0.1         \x1b[32m\x1b[1m200\x1b[22m\x1b[39m   \x1b[31m\x1b[1mDELETE\x1b[22m\x1b[39m");
                return done();
            });
    });

    it("Should set level to Info for OPTIONS", function(done) {
        var inspect = stdout.inspect();

        request(app)
            .options("/")
            .end(function() {
                inspect.restore();
                expect(inspect.output[0], "to contain", "[\x1b[35m\x1b[1mInfo\x1b[22m\x1b[39m]      [Express]       127.0.0.1         \x1b[32m\x1b[1m200\x1b[22m\x1b[39m   \x1b[36m\x1b[1mOPTIONS\x1b[22m\x1b[39m");
                return done();
            });
    });

    it("Should set level to Info for POST", function(done) {
        var inspect = stdout.inspect();

        request(app)
            .post("/")
            .end(function() {
                inspect.restore();
                expect(inspect.output[0], "to contain","[\x1b[35m\x1b[1mInfo\x1b[22m\x1b[39m]      [Express]       127.0.0.1         \x1b[32m\x1b[1m200\x1b[22m\x1b[39m   \x1b[33m\x1b[1mPOST\x1b[22m\x1b[39m");
                return done();
            });
    });

    it("Should change IPv6 localhost to IPv4", function(done) {
        var inspect = stdout.inspect();

        request(app)
            .get("/")
            .set("x-forwarded-for", "::1")
            .end(function() {
                inspect.restore();
                expect(inspect.output[0], "to contain", "[\x1b[35m\x1b[1mInfo\x1b[22m\x1b[39m]      [Express]       127.0.0.1         \x1b[32m\x1b[1m200\x1b[22m\x1b[39m   \x1b[32m\x1b[1mGET\x1b[22m\x1b[39m");
                return done();
            });
    });

    it("Should log in green for 100 statuses", function(done) {
        var inspect = stdout.inspect();

        request(app)
            .get("/info")
            .end(function() {
                inspect.restore();
                expect(inspect.output[0], "to contain", "[\x1b[35m\x1b[1mInfo\x1b[22m\x1b[39m]      [Express]       127.0.0.1         \x1b[32m\x1b[1m101\x1b[22m\x1b[39m   \x1b[32m\x1b[1mGET\x1b[22m\x1b[39m");
                return done();
            });
    });

    it("Should log in cyan for 300 statuses", function(done) {
        var inspect = stdout.inspect();

        request(app)
            .get("/redirect")
            .end(function() {
                inspect.restore();
                expect(inspect.output[0], "to contain", "[Express]       127.0.0.1         \x1b[36m\x1b[1m302\x1b[22m\x1b[39m   \x1b[32m\x1b[1mGET\x1b[22m\x1b[39m");
                return done();
            });
    });

    it("Should log in yellow for 400 statuses", function(done) {
        var inspect = stdout.inspect();

        request(app)
            .get("/nope")
            .end(function() {
                inspect.restore();
                expect(inspect.output[0], "to contain", "[\x1b[33m\x1b[1mWarning\x1b[22m\x1b[39m]   [Express]       127.0.0.1         \x1b[33m\x1b[1m404\x1b[22m\x1b[39m   \x1b[32m\x1b[1mGET\x1b[22m\x1b[39m");

                return done();
            });
    });

    it("Should log in red for 500 statuses", function(done) {
        var inspect = stdout.inspect();

        request(app)
            .get("/error")
            .end(function() {
                inspect.restore();
                expect(inspect.output[0], "to contain", "[\x1b[31m\x1b[1mError\x1b[22m\x1b[39m]     [Express]       127.0.0.1         \x1b[31m\x1b[1m500\x1b[22m\x1b[39m   \x1b[32m\x1b[1mGET\x1b[22m\x1b[39m");

                return done();
            });
    });

    it("Should throw if a non string is passed into setNamespace", function() {
        expect(function() {
            expressLog.setNamespace(null);
        }, "to throw", new Error("Not a string"));
    });

    it("Should throw if _output has missing parameters", function() {
        expect(function() {
            expressLog._output(null);
        }, "to throw", new Error("Missing parameters"));
    });

    it("Should set a namespace and get it correctly", function() {
        expressLog.setNamespace("testing");

        expect(expressLog.getNamespace(), "to equal", "testing");
    });
    it("Should delete the plugin", function() {
        logger.removePlugin('express');
        expect(logger.plugins, "to be empty");
    });
});
