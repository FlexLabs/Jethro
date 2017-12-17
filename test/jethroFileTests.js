"use strict";

var expect = require("unexpected");
var fs = require("fs");
var Jethro = require('../');
var path = require("path");
var logger = new Jethro();
var jethroFile = new Jethro.File();
var moment = require('moment');
var tempy = require('tempy');
var folder = tempy.directory();
var name = moment().format("YYYY-MM-DD") + '.txt';
var eol = require('os').EOL;
jethroFile.setFilePath(folder);
logger.addTransport("file", jethroFile);

describe("Jethro File Transport Tests", function() {
    it("Should be an instance of File", function() {
        expect(jethroFile instanceof Jethro.File, "to be true");
    });

    it("Should throw on a non string for setFilePath", function() {
        try {
            expect(jethroFile.setFilePath(null), "to throw");
        } catch (ex) {}
    });

    it("Should set the correct path", function() {
        expect(jethroFile.getFilePath(), "to equal", folder);
    });

    describe("Logging to file", function() {
        logger.info("test", "test");
        it("Should have a file with the correct formatted date", function() {
            expect(fs.existsSync(path.join(folder, name)), 'to be true');
        });
        it("Should have logged something", function(done) {
            fs.readFile(path.join(folder, name), 'utf8', function(err, data) {
                if (err) {
                    return done(err);
                }
                expect(data, "to contain", "[Info]      [test]          test" + eol);
                return done();
            });
        });
    });
});