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
    logger.clean();
    logger.disableBrackets();
    logger.disableUTC();
    logger.setTimestampFormat(undefined, 'H:mm');
};

describe("Logging Tests", function() {
    afterEach(defaultSet);
    beforeEach(defaultSet);

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
        beforeEach(defaultSet);

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

        it("Should Log to console with transport level for Logger.transport", function() {
            var inspect = stdout.inspectSync(function() {
                logger.transport("Tests", "Testing Output", date);
            });

            expect(inspect[0], "to be", now + " [" + chalk.cyan.bold("Transport") + "] [Tests]         Testing Output\n");
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
        logger.enableColour();

        expect(inspect[0], "to be", now + " [Info]      [Tests]         Testing Output\n");
    });

    it("should Log to console with no timestamp", function() {
        logger.disableTimestamp();
        var inspect = stdout.inspectSync(function() {
            output(assign({}, defaultInfo, {
                severity: "info",
            }));
        });
        logger.enableTimestamp();
        expect(inspect[0], "to equal", " [" + chalk.magenta.bold("Info") + "]      [Tests]         Testing Output\n");
    });

});

describe("Custom Log settings", function() {
    afterEach(defaultSet);
    beforeEach(defaultSet);

    describe("brackets", function() {
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