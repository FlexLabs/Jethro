"use strict";

const expect = require("unexpected");
const Jethro = require("../");
const logger = new Jethro();
const request = require("supertest");
const stdout = require("test-console").stdout;
const defaultSet = function() {
    logger.clean().disableLocation().disableBrackets().disableUTC().enableColour().enableTimestamp().resetSourceControl().setTimestampFormat(undefined, 'H:mm').enableForceColor();
};
const expressLog = new Jethro.Express();
logger.addPlugin('express', expressLog);
const express = require("express");
const response = function(req, res) {
    return res.send("Testing");
};
const app = express();

app.use(expressLog.input());
app.delete("/", response);
app.get("/", response);
app.options("/", response);
app.post("/", response);
app.get("/info", (req, res) => res.status(101).send("Testing"));
app.get("/lowdelay", (req, res) => {
    setTimeout(() => res.status(200).send("Testing"), 200);
});
app.get("/highdelay", (req, res) => {
    setTimeout(() => res.status(200).send("Testing"), 250);
});
app.get("/nope", (req, res) => res.status(404).send("Testing"));
app.get("/error", (req, res) => res.status(500).send("Testing"));
app.get("/redirect", (req, res) => res.status(302).send("Testing"));
app.listen(3000);

describe("Plugin instance Test", () => {
    it("Should throw that input hasn't been overriden", () => {
        expect(() => {
            const plugin = new Jethro.Plugin();

            plugin.input();
        }, "to throw", new Error("Input function not overwritten!"));
    });
});
describe("Express Plugin Test", () => {
    beforeEach(defaultSet);
    it("Should log 127.0.0.2 for x-real-ip", (done) => {
        const inspect = stdout.inspect();
        request(app)
            .get("/")
            .set("x-real-ip", "127.0.0.2")
            .end(() => {
                inspect.restore();
                expect(inspect.output[0], "to contain", "[Express]       127.0.0.2         \x1b[32m\x1b[1m200\x1b[22m\x1b[39m   \x1b[32m\x1b[1mGET\x1b[22m\x1b[39m");
                return done();
            });
    });

    it("Should log requests", (done) => {
        const inspect = stdout.inspect();

        request(app)
            .get("/")
            .end(() => {
                inspect.restore();
                expect(inspect.output[0], "to contain", "[\x1b[35m\x1b[1mInfo\x1b[22m\x1b[39m]      [Express]       127.0.0.1         \x1b[32m\x1b[1m200\x1b[22m\x1b[39m   \x1b[32m\x1b[1mGET\x1b[22m\x1b[39m");
                return done();
            });
    });

    it("Should set level to warning for DELETE", (done) => {
        const inspect = stdout.inspect();

        request(app)
            .delete("/")
            .end(() => {
                inspect.restore();
                expect(inspect.output[0], "to contain", "[\x1b[35m\x1b[1mInfo\x1b[22m\x1b[39m]      [Express]       127.0.0.1         \x1b[32m\x1b[1m200\x1b[22m\x1b[39m   \x1b[31m\x1b[1mDELETE\x1b[22m\x1b[39m");
                return done();
            });
    });

    it("Should set level to Info for OPTIONS", (done) => {
        const inspect = stdout.inspect();

        request(app)
            .options("/")
            .end(() => {
                inspect.restore();
                expect(inspect.output[0], "to contain", "[\x1b[35m\x1b[1mInfo\x1b[22m\x1b[39m]      [Express]       127.0.0.1         \x1b[32m\x1b[1m200\x1b[22m\x1b[39m   \x1b[36m\x1b[1mOPTIONS\x1b[22m\x1b[39m");
                return done();
            });
    });

    it("Should set level to Info for POST", (done) => {
        const inspect = stdout.inspect();

        request(app)
            .post("/")
            .end(() => {
                inspect.restore();
                expect(inspect.output[0], "to contain", "[\x1b[35m\x1b[1mInfo\x1b[22m\x1b[39m]      [Express]       127.0.0.1         \x1b[32m\x1b[1m200\x1b[22m\x1b[39m   \x1b[33m\x1b[1mPOST\x1b[22m\x1b[39m");
                return done();
            });
    });

    it("Should change IPv6 localhost to IPv4", (done) => {
        const inspect = stdout.inspect();

        request(app)
            .get("/")
            .set("x-forwarded-for", "::1")
            .end(() => {
                inspect.restore();
                expect(inspect.output[0], "to contain", "[\x1b[35m\x1b[1mInfo\x1b[22m\x1b[39m]      [Express]       127.0.0.1         \x1b[32m\x1b[1m200\x1b[22m\x1b[39m   \x1b[32m\x1b[1mGET\x1b[22m\x1b[39m");
                return done();
            });
    });

    it("Should log in green for 100 statuses", (done) => {
        const inspect = stdout.inspect();

        request(app)
            .get("/info")
            .end(() => {
                inspect.restore();
                expect(inspect.output[0], "to contain", "[\x1b[35m\x1b[1mInfo\x1b[22m\x1b[39m]      [Express]       127.0.0.1         \x1b[32m\x1b[1m101\x1b[22m\x1b[39m   \x1b[32m\x1b[1mGET\x1b[22m\x1b[39m");
                return done();
            });
    });

    it("Should log in cyan for 300 statuses", (done) => {
        const inspect = stdout.inspect();

        request(app)
            .get("/redirect")
            .end(() => {
                inspect.restore();
                expect(inspect.output[0], "to contain", "[Express]       127.0.0.1         \x1b[36m\x1b[1m302\x1b[22m\x1b[39m   \x1b[32m\x1b[1mGET\x1b[22m\x1b[39m");
                return done();
            });
    });

    it("Should log in yellow for 400 statuses", (done) => {
        const inspect = stdout.inspect();

        request(app)
            .get("/nope")
            .end(() => {
                inspect.restore();
                expect(inspect.output[0], "to contain", "[\x1b[33m\x1b[1mWarning\x1b[22m\x1b[39m]   [Express]       127.0.0.1         \x1b[33m\x1b[1m404\x1b[22m\x1b[39m   \x1b[32m\x1b[1mGET\x1b[22m\x1b[39m");

                return done();
            });
    });

    it("Should log in red for 500 statuses", (done) => {
        const inspect = stdout.inspect();

        request(app)
            .get("/error")
            .end(() => {
                inspect.restore();
                expect(inspect.output[0], "to contain", "[\x1b[31m\x1b[1mError\x1b[22m\x1b[39m]     [Express]       127.0.0.1         \x1b[31m\x1b[1m500\x1b[22m\x1b[39m   \x1b[32m\x1b[1mGET\x1b[22m\x1b[39m");

                return done();
            });
    });

    it("Should log time in yellow for < 250ms", (done) => {
        const inspect = stdout.inspect();

        request(app)
            .get("/lowdelay")
            .end(() => {
                inspect.restore();

                expect(inspect.output[0], "to match", /\[33m\[1m\d\d\d ms\[22m\[39m/);
                return done();
            });
    });

    it("Should log time in red for > 250ms", (done) => {
        const inspect = stdout.inspect();

        request(app)
            .get("/highdelay")
            .end(() => {
                inspect.restore();

                expect(inspect.output[0], "to match", /\[31m\[1m\d\d\d ms\[22m\[39m/);
                return done();
            });
    });

    it("Should throw if a non string is passed into setNamespace", () => {
        expect(() => {
            expressLog.setNamespace(null);
        }, "to throw", new Error("Not a string"));
    });

    it("Should throw if _output has missing parameters", () => {
        expect(() => {
            expressLog._output(null);
        }, "to throw", new Error("Missing parameters"));
    });

    it("Should set a namespace and get it correctly", () => {
        expressLog.setNamespace("testing");

        expect(expressLog.getNamespace(), "to equal", "testing");
    });
    it("Should delete the plugin", () => {
        logger.removePlugin('express');
        expect(logger.plugins, "to be empty");
    });
});
