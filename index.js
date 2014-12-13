//Modules
var os = require('os');
var util = require('util');
var moment = require('moment');

//Colour
var colour = require('colour');
colour.setTheme({
	info: 				'magenta bold',
	error: 				'red bold',
	transport:	  		'cyan bold',
	success:    		'green bold italic',
	warning:            'yellow bold',
	debug: 				'blue bold'
});

//Core logger function
var Logger = function(severity, source, message, location, timestamp) {
	if (typeof severity !== "object") {
		if (Logger.core.initialised === true) {
			if (typeof severity !== "undefined" && typeof source !== "undefined" && typeof message !== "undefined") {
				if (typeof location === "undefined") {
					if (Logger.core.settings.location === "undefined"){
						if (Logger.core.settings.defaultLocation === "ip") {
							Logger.core.settings.location = IP;
							location = IP;
						} else if (Logger.core.settings.defaultLocation === "hostname") {
							Logger.core.settings.location = os.hostname();
							location = os.hostname();
						} else {
							Logger.core.settings.location = os.hostname();
							location = os.hostname();
						}
					} else {
						location = Logger.core.settings.location;
					} if (typeof timestamp === "undefined") {
						timestamp = new Date();
					} 

					//Process logger data
					var data = {
						severity:severity,
						source:source,
						message:message,
						location:location,
						timestamp:timestamp
					};

					Logger.emitter.emit('logger', data);

				}
			} else {
				Logger("warning", "Logger", "Check syntax, something was undefined - Severity: "+severity+" Source: "+source+" Message: "+message);
			}
		} else {
			Logger.core.init();

			Logger("info", "Logger", "Initialising Logger...");
			setTimeout(function() {
				if (severity === "info" && source === "Logger" && message === "Initialising Logger...") {
					Logger("info", "Logger", "Initialising Logger...");
				} else {
					Logger(severity, source, message, location, timestamp);
				}
			}, 100);
		}
	} else {
		Logger("warning", "Logger", "An object was passed to Jethro, support for this is currently unavailable!");
	}
};

//Loggar innards, the core of the module
Logger.core = 		require('jethro-core');
Logger.core.pack = 	require('./package.json');
Logger.emitter = 	require('jethro-events');
Logger.file = 		require('jethro-file');
Logger.output = 	require('jethro-output');
Logger.util = 		require('jethro-utils');

Logger.init = function(options) {	
	Logger.core.init(options);
};

Logger.emitter.on('logger', function(data){
	Logger.output(data);
});



//------------------------------- File writer -----------------------------------

//Place holder for the write to file module!

module.exports = Logger;