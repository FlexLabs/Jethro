"use strict";

var expect = require("unexpected");
var Jethro = require("../");
var logger = new Jethro();
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

describe("Logger config functions", function() {
    beforeEach(defaultSet);

    describe("logger.importSettings", function() {
        it("Should change the settings object", function() {
            logger.importSettings('console',{
                "location": "testing",
                "timeformat": "DD:MM:HH",
                "output": {
                    "source": {
                        "whitelist": ["testing"],
                        "blacklist": ["testing"]
                    },
                    "colour": false,
                    "timestamp": false,
                    "console": false,
                    "timestampOpts": {
                        "brackets": true,
                        "utc": true
                    }
                }
            });
            expect(logger.settings, "not to equal", {
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
        });
    });
    describe("Logger brackets", function() {
        it("Should change brackets boolean to false with false", function() {
            logger.disableBrackets();
            expect(logger.transports.console.settings.timestamp.brackets, "to be", false);
        });

        it("Should change brackets boolean to true with true", function() {
            logger.enableBrackets();
            expect(logger.transports.console.settings.timestamp.brackets, "to be", true);
        });
    });

    describe("Logger Colour Functions", function() {
        it("Should change colour boolean to false with disableColour", function() {
            logger.disableColour('console');
            expect(logger.transports.console.settings.colour.enabled, "to be", false);
        });

        it("Should change colour boolean to true with enableColour", function() {
            logger.enableColour();
            expect(logger.transports.console.settings.colour.enabled, "to be", true);
        });

        it('Should change bold boolean to false with disableBoldColour', function() {
            logger.disableBoldColour();
            expect(logger.transports.console.settings.colour.bold, "to be", false);
        });

        it('Should change bold boolean to true with enableBoldColour', function() {
            logger.enableBoldColour();
            expect(logger.transports.console.settings.colour.bold, "to be", true);
        });

        it('Should change bold boolean to false with disableBoldColor', function() {
            logger.disableBoldColor();
            expect(logger.transports.console.settings.colour.bold, "to be", false);
        });

        it('Should change bold boolean to true with enableBoldColor', function() {
            logger.enableBoldColor();
            expect(logger.transports.console.settings.colour.bold, "to be", true);
        });
        it('Should change force boolean to false with disableForceColour', function() {
            logger.disableForceColour();
            expect(logger.transports.console.settings.colour.force, "to be", false);
        });

        it('Should change force boolean to true with enableForceColour', function() {
            logger.enableForceColour();
            expect(logger.transports.console.settings.colour.force, "to be", true);
        });

        it('Should change force boolean to false with disableForceColor', function() {
            logger.disableForceColor();
            expect(logger.transports.console.settings.colour.force, "to be", false);
        });

        it('Should change force boolean to true with enableForceColor', function() {
            logger.enableForceColor();
            expect(logger.transports.console.settings.colour.force, "to be", true);
        });
        it("Should change colour boolean to false with disableColor", function() {
            logger.disableColor('console');
            expect(logger.transports.console.settings.colour.enabled, "to be", false);
        });

        it("Should change colour boolean to true with enableColor", function() {
            logger.enableColor();
            expect(logger.transports.console.settings.colour.enabled, "to be", true);
        });
    });

    describe("Logger Location Functions", function() {
        it("Should change location to testing", function() {
            logger.setLocation("testing");
            expect(logger.getLocation(), "to be", "testing");
        });

        it("Should change location.enabled boolean to true", function() {
            logger.enableLocation();
            expect(logger.transports.console.settings.location.enabled, "to be", true);
        });

        it("Should change location.enabled boolean to false", function() {
            logger.disableLocation();
            expect(logger.transports.console.settings.location.enabled, "to be", false);
        });
    });

    describe("Logger Timeformat Functions", function() {
        it("Should change timeformat to testing", function() {
            logger.setTimestampFormat("console", "testing");
            expect(logger.transports.console.settings.timestamp.format, "to be", "testing");
        });
        it("Should throw on unknown timestamp format", function() {
            try {
                expect(logger.setTimestampFormat(undefined, undefined), "to throw");
            } catch (e) {}
        });
    });

    describe("Logger disable/enable timestamp", function() {
        it("Should change timestamp boolean to false with false", function() {
            logger.disableTimestamp();
            expect(logger.transports.console.settings.timestamp.enabled, "to be", false);
        });

        it("Should change timestamp boolean to true with true", function() {
            logger.enableTimestamp();
            expect(logger.transports.console.settings.timestamp.enabled, "to be", true);
        });
    });

    describe("Logger disable/enable UTC", function() {
        it("Should change UTC boolean to false with false", function() {
            logger.disableUTC();
            expect(logger.transports.console.settings.timestamp.utc, "to be", false);
        });

        it("Should change UTC boolean to true with true", function() {
            logger.enableUTC();
            expect(logger.transports.console.settings.timestamp.utc, "to be", true);
        });
    });
    describe("Logger source control tests", function() {
        describe("Logger.clearSourceBlacklist", function() {
            it("Should clear the blacklist", function() {
                logger.addToSourceBlacklist(undefined, "testing");
                logger.clearSourceBlacklist();
                expect(logger.transports.console.settings.source.blacklist, "to be empty");
            });
        });
        describe("Logger.clearSourceWhitelist", function() {
            it("Should clear the whitelist", function() {
                logger.addToSourceWhitelist(undefined, "testing");
                logger.clearSourceWhitelist();
                expect(logger.transports.console.settings.source.whitelist, "to be empty");
            });
        });
        describe("Logger.getSourceBlacklist", function() {
            logger.addToSourceBlacklist(undefined, "testing");
            expect(logger.getSourceBlacklist().console, "to contain", "testing");
        });
        describe("Logger.getSourceWhiteklist", function() {
            logger.addToSourceWhitelist(undefined, "testing");
            expect(logger.getSourceWhitelist().console, "to contain", "testing");
        });
        describe("Logger.addToSourceBlacklist", function() {
            it("Should change blacklist to testing", function() {
                logger.addToSourceBlacklist(undefined, "testing");
                expect(logger.transports.console.settings.source.blacklist, "to contain", "testing");
            });
            it("Should throw on non string parameter", function() {
                try {
                    expect(logger.addToSourceBlacklist(undefined, undefined), "to throw");
                } catch (e) {}
            });
        });

        describe("Logger.addToSourceWhitelist", function() {
            it("Should change whitelist to testing", function() {
                logger.addToSourceWhitelist(undefined, "testing");
                expect(logger.transports.console.settings.source.whitelist, "to contain", "testing");
            });
            it("Should throw on non string parameter", function() {
                try {
                    expect(logger.addToSourceWhitelist(undefined, undefined), "to throw");
                } catch (e) {}
            });
        });

        describe("Logger.setSourceControlSetting", function() {
            it ("should change source control to blacklist", function() {
                logger.setSourceControlSetting(undefined, "blacklist");
                expect(logger.transports.console.settings.source.enabled, "to be", "blacklist");
            });
            it("Should change source control to whitelist", function() {
                logger.setSourceControlSetting(undefined, "whitelist");
                expect(logger.transports.console.settings.source.enabled, "to equal", "whitelist");
            });
            it("Should change source control to null", function() {
                logger.setSourceControlSetting(undefined, null);
                expect(logger.transports.console.settings.source.enabled, "to equal", null);
            });
            it("Should throw on unknown setting", function() {
                try {
                    expect(logger.setSourceControlSetting(undefined, undefined, undefined), "to throw");
                } catch (e) {}
            });
        });
        describe("Logger.disableSourceControlSetting", function() {
            it("Should set source control to null", function() {
                logger.setSourceControlSetting(undefined, "blacklist");
                logger.disableSourceControlSetting();
                expect(logger.getSourceControlSetting().console, "to equal", null);
            });
        });

        describe("Logger.getSourceControlSetting", function() {
            it("Should return null by default for console", function() {
                expect(logger.getSourceControlSetting().console, "to equal", null);
            });
            it("Should return blacklist if source control is set to blacklist", function() {
                logger.setSourceControlSetting(undefined, "blacklist");
                expect(logger.getSourceControlSetting().console, "to equal", "blacklist");
            });
            it("Should return whitelist if source control is set to whitelist", function() {
                logger.setSourceControlSetting(undefined, "whitelist");
                expect(logger.getSourceControlSetting().console, "to equal", "whitelist");
            });
        });
        describe("Logger.resetSourceControl", function() {
            it ("Should reset source control settings", function() {
                logger.addToSourceBlacklist(undefined, "testing");
                logger.addToSourceWhitelist(undefined, "testing");
                logger.setSourceControlSetting(undefined, "blacklist");
                logger.resetSourceControl();
                expect(logger.getSourceControlSetting().console, "to equal", null);

            });
        });
        describe("Logger.removeFromSourceBlacklist", function() {
            beforeEach(function() {
                logger.addToSourceBlacklist(undefined, "testing");
            });
            it("Should remove from blacklist", function() {
                logger.removeFromSourceBlacklist(undefined, "testing");
                expect(logger.transports.console.settings.source.blacklist, "to be empty");
            });
            it("Should throw if a non string is a parameter", function() {
                try {
                    expect(logger.removeFromSourceBlacklist(undefined, undefined), "to throw");
                } catch (e) {}
            });
        });
        describe("Logger.removeFromSourceWhitelist", function() {
            beforeEach(function() {
                logger.addToSourceWhitelist(undefined, "testing");
            });
            it("Should remove from Whitelist", function() {
                logger.removeFromSourceWhitelist(undefined, "testing");
                expect(logger.transports.console.settings.source.whitelist, "to be empty");
            });
            it("Should throw if a non string is a parameter", function() {
                try {
                    expect(logger.removeFromSourceWhitelist(undefined, undefined), "to throw");
                } catch (e) {}
            });
        });
    });
    describe("Logger setLogLevel", function() {
        it("Should throw an error if a non boolean is the third parameter", function() {
            try {
                expect(logger.setLogLevel(undefined, 'info', "hi"), 'to throw');
            } catch (e) {}
        });
        it("Should throw an error if the second parameter is an unknown severity", function() {
            try {
                expect(logger.setLogLevel(undefined, 'undefined', true), 'to throw');
            } catch (e) {}
        });
        it("Should set a level to false", function() {
            logger.setLogLevel(undefined, 'info', false);
            expect(logger.transports.console.settings.severity.info, 'to be', false);
        });
        it("Should throw if all parameters are incorrect", function() {
            try {
                expect(logger.setLogLevel(undefined, undefined, undefined), 'to throw');
            } catch (e) {}
        });
    });
    describe("Logger enable / disable", function() {
        describe("disableTransport /enableTransport", function() {
            it("Should throw on unknown transport for disableTransport", function() {
                try {
                    expect(logger.disableTransport(undefined), "to throw");
                } catch (e) {}
            });
            it("Should throw on unknown transport for enableTransport", function() {
                try {
                    expect(logger.enableTransport(undefined), "to throw");
                } catch (e) {}
            });
            describe("Disabling console transport should work", function() {
                beforeEach(function() {
                    logger.disableTransport("console");
                });
                it("Should return false for enabled", function() {
                    expect(logger.transportEnabled("console"), "to be false");
                });
                it("Should return true for disabled", function() {
                    expect(logger.transportDisabled("console"), "to be true");
                });
            });
            describe("Enabling console transport should work", function() {
                beforeEach(function() {
                    logger.disableTransport("console");
                });
                it("Should return false for enabled", function() {
                    logger.enableTransport("console");
                    expect(logger.transportEnabled("console"), "to be true");
                });
                it("Should return false for disabled", function() {
                    logger.enableTransport("console");
                    expect(logger.transportDisabled("console"), "to be false");
                });
            });
        });
    });
    describe("Logger getColorSettings", function() {
        it("Should return color settings",function() {
            expect(logger.getColorSettings().console, "to have keys", ["bold", "enabled", "force"]);
        });
        it("Should return colour settings",function() {
            expect(logger.getColourSettings().console, "to have keys", ["bold", "enabled", "force"]);
        });
    });
    describe("Logger clean", function() {
        it("Should reset to defaults on invalid settings", function() {
            logger.transports.console.settings.timestamp = logger.transports.console.settings.location = logger.transports.console.settings.severity = logger.transports.console.settings.source = logger.transports.console.settings.colour = logger.transports.console.settings._enabled = undefined;
            logger.clean();
            expect(logger.isValid().console, "to be true");
        });
        it("Should validate all paths for invalid settings", function() {
            logger.transports.console.settings.location = {
                enabled: undefined
            };
            logger.transports.console.settings.colour = {
                bold: undefined,
                enabled: undefined,
                force: undefined
            };
            logger.transports.console.settings.source = {
                blacklist: undefined,
                whitelist: undefined,
                enabled: undefined
            };
            logger.transports.console.settings.timestamp = {
                enabled: undefined,
                format: undefined,
                utc: undefined,
                brackets: undefined
            };
            logger.transports.console.settings.severity = {
                debug: undefined,
                error: undefined,
                info: undefined,
                transport: undefined,
                warning: undefined
            };
            logger.clean();
            expect(logger.isValid().console, "to be true");
        });
    });
});

