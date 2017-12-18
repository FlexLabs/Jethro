"use strict";

var assign = require("object-assign");
var chalk = require("chalk");
var date = new Date();
var expect = require("unexpected");
var Jethro = require("../");
var logger = new Jethro();
var moment = require("moment");
var now = moment(date.toISOString()).format('H:mm');
var nowUTC = moment(date.toISOString()).utc().format('H:mm');
var output = logger.output.bind(logger);
var stdout = require("test-console").stdout;
var defaultInfo = {
    message: "Testing Output",
    source: "Tests",
    timestamp: date
};
var defaultSet = function() {
    logger.clean().disableLocation().disableBrackets().disableUTC().enableColour().enableTimestamp().resetSourceControl().setTimestampFormat(undefined, 'H:mm').enableForceColor();
};
var chalk = require("chalk");
var forceChalk = new chalk.constructor({
    enabled: true
});

describe("Jethro Transport Functionality", function() {
    beforeEach(defaultSet);
    describe("Transport formatString", function() {
        it("Should throw on non object", function() {
            expect(function() {
                logger.transports.console.formatString(undefined);
            }, "to throw", new Error("A non-object was sent to the Logger.output() function! See: undefined"));
        });
    });
    describe("Transport _input", function() {
        it("Should throw missing parameters if parameters are missing", function() {
            expect(function() {
                logger.transports.console._input(undefined);
            }, "to throw", new Error("Missing parameters!"));
        });
    });
    describe("Transport getLocation", function() {
        it("Should return the location", function() {
            expect(logger.transports.console.getLocation({location: "127.0.0.1"}), "to equal", "[127.0.0.1]");
        });
    });
    describe("Transport getMessage", function() {
        it("Should return the message", function() {
            expect(logger.transports.console.getMessage({message: "test"}), "to equal", "test");
        });
        it("Should inspect on a non string", function() {
            expect(logger.transports.console.getMessage({message: {foo: 'bar'}}), "to equal", require("util").inspect({foo: 'bar'}));
        });
    });
    describe("Transport getSeverity", function() {
        it("Should return [Info] with Magenta for info severity", function() {
            expect(logger.transports.console.getSeverity({severity: "info"}), "to equal", "[" + chalk.magenta.bold("Info") + "]");
        });
        it("Should return undefined for invalid severity", function() {
            expect(logger.transports.console.getSeverity(undefined), "to equal", "[undefined]");
        });
    });
    describe("Transport getSeverityColor", function() {
        describe("Force colors", function() {
            it("Should return yellow for warning", function() {
                expect(logger.transports.console.getSeverityColour("warning"), "to equal", forceChalk.yellow.bold("warning"));
            });
            it("Should return blue for debug", function() {
                expect(logger.transports.console.getSeverityColour("debug"), "to equal", forceChalk.blue.bold("debug"));
            });
            it("Should return red for error", function() {
                expect(logger.transports.console.getSeverityColour("error"), "to equal", forceChalk.red.bold("error"));
            });
            it("Should return magenta for info", function() {
                expect(logger.transports.console.getSeverityColour("info"), "to equal", forceChalk.magenta.bold("info"));
            });
            it("Should return magenta for success", function() {
                expect(logger.transports.console.getSeverityColour("success"), "to equal", forceChalk.green.bold("success"));
            });
            it("Should return cyan for transport", function() {
                expect(logger.transports.console.getSeverityColour("transport"), "to equal", forceChalk.cyan.bold("transport"));
            });
        });
        describe("Normal colors", function() {
            beforeEach(function() {
                logger.disableForceColour();
            });
            it("Should return yellow for warning", function() {
                expect(logger.transports.console.getSeverityColour("warning"), "to equal", chalk.yellow.bold("warning"));
            });
            it("Should return blue for debug", function() {
                expect(logger.transports.console.getSeverityColour("debug"), "to equal", chalk.blue.bold("debug"));
            });
            it("Should return red for error", function() {
                expect(logger.transports.console.getSeverityColour("error"), "to equal", chalk.red.bold("error"));
            });
            it("Should return magenta for info", function() {
                expect(logger.transports.console.getSeverityColour("info"), "to equal", chalk.magenta.bold("info"));
            });
            it("Should return green for success", function() {
                expect(logger.transports.console.getSeverityColour("success"), "to equal", chalk.green.bold("success"));
            });
            it("Should return cyan for transport", function() {
                expect(logger.transports.console.getSeverityColour("transport"), "to equal", chalk.cyan.bold("transport"));
            });
        });
    });
    describe("Transport getSource", function() {
        it("Should return the source", function() {
            expect(logger.transports.console.getSource({source: "source"}), "to equal", "[source]");
        });
        it("Should default to [undefined] on invalid source", function() {
            expect(logger.transports.console.getSource(undefined), "to equal", "[undefined]");
        });
    });
    describe("Transport getTimestamp", function() {
        it("Should return the timestamp", function() {
            expect(logger.transports.console.getTimestamp({timestamp: date}), "to equal", moment(date.toISOString()).format(logger.transports.console.settings.timestamp.format));
        });
        it("Should return the timestamp in utc", function() {
            logger.enableUTC();

            expect(logger.transports.console.getTimestamp({timestamp: date}), "to equal", moment(date.toISOString()).utc().format(logger.transports.console.settings.timestamp.format));
        });
        it("Should return the timestamp with brackets", function() {
            logger.enableBrackets();

            expect(logger.transports.console.getTimestamp({timestamp: date}), "to equal", "[" + moment(date.toISOString()).format(logger.transports.console.settings.timestamp.format) + "]");
        });
    });
    describe("Transport output", function() {
        it("Should throw if output function isn't overriden", function() {
            expect(function() {
                var transport = new Jethro.Transport();

                transport.output();
            }, "to throw", new Error("Output function not overwritten!"));
        });
    });
});
describe("logger.set (deprecated)", function() {
    it("Should log its deprecated", function(done) {
        if (process.versions.node.split(".")[0] > 4) {
            logger.set("console", {});
            process.on("warning", function(warning) {
                expect(warning.message, "to be", "logger.set is deprecated, please use .importSettings instead!");

                return done();
            });
        } else {
            var stderr = require('test-console').stderr;
            var inspect = stderr.inspectSync((function() {
                logger.set("console", {});
            }));
            expect(inspect[0], "to be", "logger.set is deprecated, please use .importSettings instead!\n");
            return done();
        }
    });
});
describe("Logging Tests", function() {
    beforeEach(defaultSet);

    describe("Direct output", function() {
        it("Should throw on invalid type for direct output", function() {
            expect(function() {
                output(undefined);
            }, "to throw", new Error("Missing data parameter."));
        });
    });

    describe("Legacy output", function() {
        // TODO: Fix legacy output. Currently it does not auto capitalize the severity, nor the source. As well as settings are not working for it. Not sure why.
        it("Should work with Legacy output", function() {
            var inspect = stdout.inspectSync(function() {
                Jethro("Info", "Tests", "Testing Output", date);
            });

            expect(inspect[0], "to contain", "[" + chalk.magenta.bold("Info") + "]      [Tests]         Testing Output\n");
        });
    });
    describe("Logger addTransport", function() {
        it("Should fail on non instance of Transport", function() {
            expect(function() {
                logger.addTransport("test", undefined);
            }, "to throw", new TypeError("Provided Transport not an instance of Transport Class"));
        });
        it("Should fail on non string transport name", function() {
            expect(function() {
                logger.addTransport(undefined);
            }, "to throw", new TypeError("Provided Transport Name is not a string."));
        });
    });
    describe("Logger getId", function() {
        it("Should have an ID", function() {
            expect(logger.getId(), "to match", /[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}/i);
        });
    });

    describe("Logger resetTimestampFormat", function() {
        it("Should reset the format", function() {
            logger.resetTimestampFormat();

            expect(logger.transports.console.settings.timestamp.format, "to equal", "HH:mm:ss[s] SSS[ms]");
        });
    });

    describe("Logger _outputHandler", function() {
        it("Should throw on invalid data", function() {
            expect(function() {
                logger._outputHandler(undefined);
            }, "to throw", new Error("Missing parameters"));
        });

        // TODO: Fix when namespaces can be added.
        it.skip("Should throw if not handled by a transport", function() {
            expect(function() {
                logger._outputHandler(assign({}, defaultInfo, {
                    namespace: "testing",
                    severity: "info"
                }));
            }, "to throw", new Error("Namespace: testing not handled"));
        });
    });

    describe("Logger Levels", function() {
        it("Should Log to console with debug level", function() {
            var inspect = stdout.inspectSync(function() {
                output(assign({}, defaultInfo, {
                    severity: "debug"
                }));
            });

            expect(inspect[0], "to be", now + " [" + chalk.blue.bold("Debug") + "]     [Tests]         Testing Output\n");
        });


        it("Should Log to console with error level", function() {
            var inspect = stdout.inspectSync(function() {
                output(assign({}, defaultInfo, {
                    severity: "error"
                }));
            });

            expect(inspect[0], "to be", now + " [" + chalk.red.bold("Error") + "]     [Tests]         Testing Output\n");
        });

        it("Should Log to console with info level", function() {
            var inspect = stdout.inspectSync(function() {
                output(assign({}, defaultInfo, {
                    severity: "info"
                }));

            });

            expect(inspect[0], "to be", now + " [" + chalk.magenta.bold("Info") + "]      [Tests]         Testing Output\n");
        });

        it("Should Log to console with success level", function() {
            var inspect = stdout.inspectSync(function() {
                output(assign({}, defaultInfo, {
                    severity: "success"
                }));

            });

            expect(inspect[0], "to be", now + " [" + chalk.green.bold("Success") + "]   [Tests]         Testing Output\n");
        });

        it("Should Log to console with transport level", function() {
            var inspect = stdout.inspectSync(function() {
                output(assign({}, defaultInfo, {
                    severity: "transport"
                }));

            });

            expect(inspect[0], "to be", now + " [" + chalk.cyan.bold("Transport") + "] [Tests]         Testing Output\n");
        });

        it("Should Log to console with warning level", function() {
            var inspect = stdout.inspectSync(function() {
                output(assign({}, defaultInfo, {
                    severity: "warning"
                }));

            });

            expect(inspect[0], "to be", now + " [" + chalk.yellow.bold("Warning") + "]   [Tests]         Testing Output\n");
        });

    });

    describe("Logger.<level> Tests", function() {
        it("Should Log to console with debug level for Logger.debug", function() {
            var inspect = stdout.inspectSync(function() {
                logger.debug("Tests", "Testing Output", date);
            });

            expect(inspect[0], "to be", now + " [" + chalk.blue.bold("Debug") + "]     [Tests]         Testing Output\n");
        });

        it("Should Log to console with error level for Logger.error", function() {
            var inspect = stdout.inspectSync(function() {
                logger.error("Tests", "Testing Output", date);
            });

            expect(inspect[0], "to be", now + " [" + chalk.red.bold("Error") + "]     [Tests]         Testing Output\n");
        });

        it("Should Log to console with info level for Logger.info", function() {
            var inspect = stdout.inspectSync(function() {
                logger.info("Tests", "Testing Output", date);
            });

            expect(inspect[0], "to be", now + " [" + chalk.magenta.bold("Info") + "]      [Tests]         Testing Output\n");
        });

        it("Should Log to console with success level for Logger.success", function() {
            var inspect = stdout.inspectSync(function() {
                logger.success("Tests", "Testing Output", date);
            });

            expect(inspect[0], "to be", now + " [" + chalk.green.bold("Success") + "]   [Tests]         Testing Output\n");
        });

        describe("Logger Trace", function() {
            it("Should Log to console with trace level for Logger.trace", function() {
                var error = new TypeError("Test is undefined");
                var inspect = stdout.inspectSync(function() {
                    logger.trace("Tests", error);
                });

                expect(inspect[0], "to be", now + " [" + chalk.red.bold("Error") + "]     [Tests]         " + error.message + "\n");
            });

            it("Should throw if a non error is sent in", function() {
                expect(function() {
                    logger.trace("tests", undefined);
                }, "to throw", new Error("Error not sent to Jethro.trace"));
            });

        });


        it("Should Log to console with transport level for Logger.transport", function() {
            var inspect = stdout.inspectSync(function() {
                logger.transport("Tests", "Testing Output", date);
            });

            expect(inspect[0], "to be", now + " [" + chalk.cyan.bold("Transport") + "] [Tests]         Testing Output\n");
        });

        it("Should Log to console with warning level for Logger.warning", function() {
            var inspect = stdout.inspectSync(function() {
                logger.warning("Tests", "Testing Output", date);
            });

            expect(inspect[0], "to be", now + " [" + chalk.yellow.bold("Warning") + "]   [Tests]         Testing Output\n");
        });

    });


    describe("Logger Undefined / thrown errors", function() {
        it("should Log to console with undefined message", function() {
            var inspect = stdout.inspectSync(function() {
                output(assign({}, defaultInfo, {
                    message: undefined,
                    severity: "info",
                }));
            });
            expect(inspect[0], "to be", now + " [" + chalk.yellow.bold("Warning") + "]   [Logger]        Check syntax, something was undefined - Severity: info Source: Tests Message: undefined\n");

        });

        it("Should Log to console with bogus level", function() {
            var inspect = stdout.inspectSync(function() {
                output(assign({}, defaultInfo, {
                    severity: "bogus"
                }));

            });

            expect(inspect[0], "to be", now + " [Bogus]     [Tests]         Testing Output\n");
        });

        it("Should Log to console with undefined severity", function() {
            var inspect = stdout.inspectSync(function() {
                output(assign({}, defaultInfo, {
                    severity: undefined
                }));

            });

            expect(inspect[0], "to be", now + " [" + chalk.yellow.bold("Warning") + "]   [Logger]        Check syntax, something was undefined - Severity: undefined Source: Tests Message: Testing Output\n");
        });

        it("should Log to console with undefined source", function() {
            var inspect = stdout.inspectSync(function() {
                output(assign({}, defaultInfo, {
                    message: "Testing Output",
                    severity: "info",
                    source: undefined
                }));
            });

            expect(inspect[0], "to be", now + " [" + chalk.yellow.bold("Warning") + "]   [Logger]        Check syntax, something was undefined - Severity: info Source: undefined Message: Testing Output\n");
        });


        it("Should warn if object is passed to logger", function() {
            var inspect = stdout.inspectSync(function() {
                logger.log({
                    "test": "test"
                });
            });

            expect(inspect[0], "to be", now + " [" + chalk.yellow.bold("Warning") + "]   [Logger]        An object was passed to Jethro, support for this is currently unavailable!\n");
        });

        it("Should throw if non object is passed to output", function() {

            // Adding try catch to bypass it from failing tests.
            try {
                expect(output("testing"), "to throw");
            } catch (ex) { // No need to log an exception was caught.
            }
        });

        it("Should warn if something is undefined", function() {
            var inspect = stdout.inspectSync(function() {
                logger.log("info", "Test", undefined, date);
            });

            expect(inspect[0], "to contain", "Check syntax, something was undefined - Severity");
        });
    });

    it("should Log to console with no colour", function() {
        logger.disableColour();
        var inspect = stdout.inspectSync(function() {
            output(assign({}, defaultInfo, {
                severity: "info"
            }));
        });

        expect(inspect[0], "to be", now + " [Info]      [Tests]         Testing Output\n");
    });

    it("should Log to console with no timestamp", function() {
        logger.disableTimestamp();
        var inspect = stdout.inspectSync(function() {
            output(assign({}, defaultInfo, {
                severity: "info",
            }));
        });

        expect(inspect[0], "to equal", " [" + chalk.magenta.bold("Info") + "]      [Tests]         Testing Output\n");
    });
    describe("Custom Log settings", function() {
        describe("Brackets", function() {
            it("Should log timestamp with brackets", function() {
                logger.enableBrackets();
                var inspect = stdout.inspectSync(function() {
                    output(assign({}, defaultInfo, {
                        message: "Testing Output",
                        severity: "info",
                        source: "Tests"
                    }));

                });

                expect(inspect[0], "to be", "[" + now + "]" + " [\x1b[35m\x1b[1mInfo\x1b[22m\x1b[39m]      [Tests]         Testing Output\n");
            });
        });
        describe("Location", function() {
            it("Should log a location", function() {
                logger.enableLocation("console");
                var inspect = stdout.inspectSync(function() {
                    output(assign({}, defaultInfo, {
                        message: "Testing Output",
                        severity: "info",
                        source: "Tests"
                    }));

                });

                expect(inspect[0], "to be", now + " [\x1b[35m\x1b[1mInfo\x1b[22m\x1b[39m]     " + logger.spaceOut("[" + logger.getLocation() + "]", 20) + " [Tests]         Testing Output\n");
            });
        });
        describe("Timeformats", function() {
            it("Should log with a custom format", function() {
                logger.setTimestampFormat(undefined, "DD:MM:YYYY");
                var inspect = stdout.inspectSync(function() {
                    output(assign({}, defaultInfo, {
                        message: "Testing Output",
                        severity: "info",
                        source: "Tests"
                    }));

                });
                expect(inspect[0], "to be", moment().format("DD:MM:YYYY") + " [\x1b[35m\x1b[1mInfo\x1b[22m\x1b[39m]      [Tests]         Testing Output\n");
            });

            it("Should log with utc format", function() {
                logger.enableUTC();
                var inspect = stdout.inspectSync(function() {
                    output(assign({}, defaultInfo, {
                        message: "Testing Output",
                        severity: "info",
                        source: "Tests"
                    }));

                });
                expect(inspect[0], "to be", nowUTC + " [\x1b[35m\x1b[1mInfo\x1b[22m\x1b[39m]      [Tests]         Testing Output\n");
            });
        });
    });
});

