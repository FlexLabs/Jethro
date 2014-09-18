//Core Modules
var os = require('os');
var util = require('util');

//Node_Modules
var EventEmitter = require('eventemitter2').EventEmitter2;
var moment = require('moment');

//Colour
var colour = require('colour');
var colourSettings = require('./lib/colour.js');

//Settings
var pack = require('./package.json');

//Core logger function
var Logger = function(severity, source, message, location, timestamp) {
	if (typeof severity !== "object") {
		if (Logger.core.initialised === true) {
			if (typeof severity !== "undefined" && typeof source !== "undefined" && typeof message !== "undefined") {
				if (typeof location === "undefined") {
					if (Logger.core.settings.location === "undefined"){
						Logger.core.settings.location = os.hostname();
						location = os.hostname();
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
		Logger("warning", "Logger", "An object was passed to Jethro, support for this is currently unavailable!")
	}
};

//Loggar innards, the core of the module
Logger.core = {
	initialised: false,

	settings: {

		location: "undefined",

		timeformat: "undefined",

		output: {
			displayOpts: {
				severity: true,
				source: true,
				message: true,
				location: false,
				timestamp: true
			},
			sourceOpts: {
				whitlistOnly: false,
				sourceWhiteList: [],
				sourceBlackList: [],
			}
		},

		catchUncaught: false,
		catchExit: false
	},

	init: function(options) {
		if (options.quickStart !== true) {
			Logger.output({timestamp:new Date(), message:"Logger is starting up...", source:"Logger", severity:"info"})
		}
		if (typeof options === "undefined") {
			options = {}
		} 

		if (Logger.core.initialised === false) {

			//Makes sure init cannot be called again
			Logger.core.initialised = true;

			//Sets the loggers settings
			Logger.settings.set(options)

			//Startup the respective services...
			if (typeof options.file !== "undefined") {
				if (options.file.run === true) {
					Logger.startFile(options.file)
				}
			} 
			if (typeof options.socket !== "undefined") {
				if (options.socket.run === true) {
					Logger.startSocket(options.socket)
				}
			} 
			if (typeof options.database !== "undefined") {
				if (options.database.run === true) {
					Logger.startDatabase(options.database)
				}
			}
			if (options.quickStart !== true) {
				Logger.output({timestamp:new Date(), message:"Logger "+pack.version+" succesfully initialised!", source:"Logger", severity:"success"})
			}
		} else {
			
			//Example of direct-to-console logging
			Logger.output({
				severity:'warning', 
				source:'Logger',
				message:'Logger is already initialised!',
				timestamp: new Date(),
				location: os.hostname()
			});
		}
	}
};

Logger.settings = {
	set: function(options) {
		for(var prop in options){
			Logger.core.settings[prop] = options[prop];
		}

		catchUncaught()
		catchExit()
	},
	addToWhiteList: function(parameter, arr) {

	},
	addToBlackList: function(parameter, arr) {

	}
}

Logger.init = function(options) {
	Logger.core.init(options);
};

Logger.emitter = new EventEmitter({
	// use wildcards.
	wildcard: true,
	// the delimiter used to segment namespaces, defaults to `.`.
	delimiter: '::', 
	// if you want to emit the newListener event set to true.
	newListener: false, 
	// max listeners that can be assigned to an event, default 10.
	maxListeners: 20
});

Logger.emitter.on('logger', function(data) {
	Logger.output(data);
});

Logger.output = function(data) {
	if (typeof data === "object") {

		var a = "";
		var b = "";
		var c = "";
		var d = "";
		var e = "";
		var x = " ";
		var y = " ";
		var z = "	";

		if (typeof data.timestamp !== "undefined" && Logger.core.settings.output.displayOpts.timestamp === true) {
			if (Logger.core.settings.timeformat !== "undefined" && Logger.core.settings.timeformat !== "undefined") {
				try {
					a = "[" + moment().format(Logger.core.settings.timeformat) + "] ";
				} catch (e) {
					a = "[" + moment().format('DD MMM HH:mm:ss') + "] ";
				}
			} else {
				a = "[" + Logger.util.formatTimestamp(data.timestamp) + "] ";
			}
		}
		if (typeof data.severity !== "undefined" && Logger.core.settings.output.displayOpts.severity === true) {
			var h = Logger.util.capitiliseFirstLetter(data.severity);
			switch (data.severity.toLowerCase()) {
	            case 'success':
	            	b = "[" + h.success + "]   ";
	            break;
	            case 'transport':
	            	b = "[" + h.transport + "] ";
	            break;
	            case 'debug':
	            	b = "[" + h.debug + "]     ";
	            break;
	            case 'info':
	            	b = "[" + h.info + "]      ";
	            break;
	            case 'warning':
	            	b = "[" + h.warning + "]   ";
	            break;
	            case 'error':
	            	b = "[" + h.error + "]     ";
	            break;
	            default:
					b = "[" + h + "]     ";
	        }
		}
		if (typeof data.location !== "undefined" && Logger.core.settings.output.displayOpts.location === true) {
			c = "[" + data.location + "] ";
		}	
		if (typeof data.source !== "undefined" && Logger.core.settings.output.displayOpts.source === true) {
			d = "[" + data.source + "] ";
		}
		if (typeof data.message !== "undefined" && Logger.core.settings.output.displayOpts.message === true) {
			e = "" + data.message + "";
		}
		console.log(a + b + c + d + "	" + e + "	");
	} else {
		throw new Error("A non-object was sent to the Logger.output() function! See: "+util.inspect(data));
	}
};

Logger.util = require('./lib/util.js');

Logger.startServer = function(options) {
	//Preparation for logger socket server
	Logger("info", "Logger", "Starting Socket server utility...");
	Logger("warning", "Logger", "The Socket server utility is not complete and as a result will not load!");
};
Logger.startClient = function(options) {
	//Preparation for logger socket client
	Logger("info", "Logger", "Starting Socket client utility...");
	Logger("warning", "Logger", "The Socket client utility is not complete and as a result will not load!");
};
Logger.startDatabase = function(options) {
	//Preparation for sending to a database
	Logger("info", "Logger", "Starting Database utility...");
	Logger("warning", "Logger", "The Database utility is not complete and as a result will not load!");
};
Logger.startFile = function(options) {
	//Preparation for local file logging
	Logger("info", "Logger", "Starting File logging utility...");
	Logger("warning", "Logger", "The File logging utility is not complete and as a result will not load!");
};
var catchUncaught = function() {
	//For production certified code only!
	if (Logger.core.settings.catchUncaught === true) {
		process.on('uncaughtException', function(e) {
		    logger('error', 'Exception', 'Logger caught exception: '+e.stack);
		})
	}
}

var catchExit = function() {
	if (Logger.core.settings.catchExit === true) {
		process.on('exit', function(e) {
	    	logger('error', 'Caught Exit', 'Logger caught exit with code: ' + e);
		});
	}
}

module.exports = Logger;