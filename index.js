//Core Modules
var os = 			require('os');
var util = 			require('util');
var fs = 			require('fs');
var path = 			require('path');

//Node_Modules
var EventEmitter = 	require('eventemitter2').EventEmitter2;
var moment = 		require('moment');
var strip =	 		require('stripcolorcodes');
var mkdirp = 		require('mkdirp');
var io =			require('socket.io-client');

//Colour
var colour = 		require('colour');
colour.setTheme({
	info: 				'magenta bold',
	error: 				'red bold',
	transport:  		'cyan bold',
	success:    		'green bold italic',
	warning:            'yellow bold',
	debug: 				'blue bold'
});

//Settings
var pack = require('./package.json');
var ipify = require('ipify');
var IP = "127.0.0.1";


//Main Logger function
var Logger = function(severity, source, message, location, timestamp) {
	if (typeof severity !== "object") {
		if (Logger.core.initialised === true) {
			if (typeof severity !== "undefined" && typeof source !== "undefined" && typeof message !== "undefined") {
				if (Logger.core.settings.location === "undefined" && typeof location === "undefined"){
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

// - - - - - - - - - Core Module - - - - - - - - - - - - - - - - - - - - - - - - 

Logger.core = {
	initialised: false,
	settings: require('./config.json'),
	init: function(options) {

		if (typeof options === "undefined") {
			options = {};
		}
		if (Logger.core.initialised === false) {

			//Makes sure init cannot be called again
			Logger.core.initialised = true;

			//Sets the loggers settings
			Logger.settings.set(options);

			//Startup the respective services...
			if (process.argv.indexOf('-output')>-1){
				var i = process.argv.indexOf('-output');
				var j = i+1;
				if (process.argv[j] === 'false') {
					Logger.core.settings.output.console = false;
				} else {
					Logger.core.settings.output.console = true;
				}
			} else {
				Logger.core.settings.output.console = true;
			}

			//Sets the default Location
			if (typeof options.defaultLocation !== "undefined"){
				if (options.defaultLocation === "ip") {
					Logger.core.settings.location = IP;
				} else if (options.defaultLocation === "hostname") {
					Logger.core.settings.location = os.hostname();
				}
			}

			//Make sure you don't break the modules/transport settings.
			if (typeof options.modules !== "undefined") {
				if (options.modules.file === true){
					Logger.startFile();
				} if (options.modules.socket === true){
					Logger.startSIO(Logger.core.settings.socket.address, Logger.core.settings.socket.namespace, Logger.core.settings.socket.username, Logger.core.settings.socket.password);
				}
			} 

			//Let's make sure you don't break the output settings. If you set one, SET THEM ALL!
			if (typeof options.output === "undefined" && typeof Logger.core.settings.output === "undefined"){
				Logger.core.settings.output = {
					quickStart: true,
					console: true,
					displayOpts: {
						severity: true,
						source: true,
						message: true,
						location: false,
						timestamp: true
					},
					sourceOpts: {
						whitelistOnly: false,
						sourceWhitelist: [],
						sourceBlacklist: [],
					},
					timestampOpts: {
						brackets: false
					}
				}
			}
			//When Finished!
			if (options.quickStart !== true) {
				Logger.output({timestamp:new Date(), message:"Logger "+pack.version+" succesfully initialised!", source:"Logger", severity:"success"});
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

		catchUncaught();
		catchExit();
	},
	addToWhiteList: function(parameter, arr) {

	},
	addToBlackList: function(parameter, arr) {

	},
	setLocation: function(loc) {
		Logger.core.settings.location = loc;
	}
};

Logger.init = function(options) {	
	Logger.core.init(options);
};

// - - - - - - - - Event Stream - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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

Logger.emitter.on('logger', function(data){
	Logger.output(data);
	/*Logger.output(data, function(log){
		console.log(log);
	});*/
});


//- - - - - - - - - - Outputs - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


//Console output
Logger.output = function(data, callback) {
	if (typeof data === "object") {
		var a = "";
		var b = "";
		var c = "";
		var d = "";
		var e = "";
		var f = "";
		if (Logger.core.settings.output.displayOpts.timestamp === true || typeof callback === "function") {
			if (typeof data.timestamp !== "undefined"){
				if (Logger.core.settings.timeformat !== "undefined" && Logger.core.settings.timeformat !== "undefined") {
					try {
						f = moment().format(Logger.core.settings.timeformat);
					} catch (e) {
						f = moment().format('DD MMM HH:mm:ss');
					}
				} else {
					f = Logger.util.formatTimestamp(data.timestamp);
				}
			} else {
				f = Logger.util.formatTimestamp(new Date());
			}
		} if (Logger.core.settings.output.timestampOpts.brackets === true) {
			a = "["+f+"] ";
		} else {
			a = f+" ";
		} if (Logger.core.settings.output.displayOpts.severity === true || typeof callback === "function") {
			if (typeof data.severity !== "undefined"){
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
			} else {
				b = "[" + "undefined".error + "]      ";
			}
		} if (Logger.core.settings.output.displayOpts.location === true || typeof callback === "function") {
			if (typeof data.location !== "undefined"){
				if (data.location.length > 9) {
					c = "[" + data.location + "] 	";
				} else {
					c = "[" + data.location + "]    	";
				}

			} else {
				c = "[" + Logger.core.settings.location + "] 	";
			}
		} if (Logger.core.settings.output.displayOpts.source === true || typeof callback === "function") {
			if (typeof data.source !== "undefined"){
				d = "[" + data.source + "] ";
			} else {
				d = "[" + "undefined" + "] ";
			}
		} if (Logger.core.settings.output.displayOpts.message === true || typeof callback === "function") {
			if (typeof data.message !== "undefined"){
				e = "" + data.message + "";
			} else {
				e = "" + "undefined".error + "";
			}
		}
		var output = (a + b + c + d + "	" + e + "	");

		if (typeof callback !== "undefined") {
			callback(output);
		} else {
			if (Logger.core.settings.output.console === true) {
				console.log(output);
			}
		}
	} else {
		throw new Error("A non-object was sent to the Logger.output() function! See: "+util.inspect(data));
	}
};


// - - - - - - - - - - - - - - - - - - File Logging Utility - - - - - - - - - - - - - - - - - - - -

Logger.startFile = function(options) {
	//Preparation for local file logging
	Logger("info", "Logger", "Starting File logging utility...");
	Logger.emitter.onAny(function(data){
		if (Logger.core.settings.modules.file === true){
			var event = this.event
			Logger.output(data, function(log) {
				var dir = path.resolve(__dirname, "../../");
				if (Logger.core.settings.server === true){
					dir = dir+"/logs/"+data.location
				}
				Logger.file(log, dir+"/"+event)
				if (event !== "logger" && data.output === true) {
					try {
						var a = data.source;
						var b = event;
						if (a.indexOf(b) > -1){
							data.source = a;
						} else {
							data.source = a+":"+b;
						}
						Logger.output(data)
					} catch (e) {
						Logger('error', 'Logger', 'Event: '+event+" has not been formatted properly and has created an error! "+e)
					}
				}
			});
		}
	});
};

Logger.file = function(data, location) {
	var a = strip(data)
	try {
		if (fs.readdirSync(location)){
			fs.appendFile(location+"/log "+Logger.util.getDateString()+".txt", a+"\r\n", function(err){
				if (!err) {
				
				} else {

				}
			});
		}
	} catch (e) {
		mkdirp(location, function(err) {
			if (err) {

			} else {
				Logger.file(data, location)
			}
		})
	}
}

//- - - - - - - - - - - - - - - - Socket Transport - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
var socketio = function(address, namespace, username, password) {

	var io = require("socket.io-client");

	//var address = "http://31.220.43.201:1337"
	
	Logger.socket = io(address+namespace, {query:{username:username, password:password}});

	Logger('info', 'Socket', "Connecting to HenchSocket: "+address+namespace)

	//Generic Connection Events
	Logger.socket.on("connect", function(){
	    Logger('success', 'Socket', 'Connected!')
	});

	Logger.socket.on("disconnect", function(){
	    Logger('warning', 'Socket', 'Disconnected!')
	});

	Logger.socket.on("error", function(e){
	    Logger('warning', 'Socket', e)
	});

	Logger.socket.on("reconnecting", function(a){
		if (a < 2) {
	    	Logger('warning', 'Socket', 'Reconnecting... ')
	    }
	});
}

Logger.startSIO = function(){
	socketio(Logger.core.settings.socket.address, Logger.core.settings.socket.namespace, Logger.core.settings.socket.username, Logger.core.settings.socket.password);

	Logger.emitter.onAny(function(data){
		if (Logger.core.settings.modules.socket === true && Logger.core.settings.server === false){
			Logger.socket.emit(this.event, data)
		}
	});
};

// - - - - - - - - - - - - - Express Middleware - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Logger.express = function(req, res, next){
    var code = res.statusCode;
    Logger('info', 'Express', code + ' ' + req.method.green.bold + ' ' + req.headers.host + ' --> ' + req.originalUrl);
    next();
}

Logger.morgan = require('morgan');

// - - - - - - - - - - - - - - Socket IO Client - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Logger.startClient = function(options) {
	//Preparation for logger socket client
	Logger("info", "Logger", "Starting Socket client utility...");
	Logger("warning", "Logger", "The Socket client utility is not complete and as a result will not load!");
};

// - - - - - - - - - - - - - - - - MySQL - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Logger.mysql = {
	output: function(data, logger) {
		try {
			switch(this.event) {
				case 'connecting':
					if (data.connectionAttempts < 3) {
						return Logger('info', 'MySQL', 'Connecting for the '+Logger.util.getWord(data.connectionAttempts+1)+' time to '+data.host);
					}
				break;
				case 'connected':
					return Logger('success', 'MySQL', 'Connected to '+data.database+"@"+data.host);
				break;
				case 'disconnected':
					return Logger('warning', 'MySQL', 'Disconnected from '+data.host+" with code "+data.code);
				break;
				case 'error':
					return Logger('warning', 'MySQL', 'Error - '+data.host+": "+data.err);
				break;
				case 'sending':
					return Logger('transport', 'MySQL', 'Sending call: `'+data.call+'`');
				break;
				case 'start_complete':
					return Logger('transport', data);
				break;
				case 'message':
					return Logger(data);
			}
		} catch (e) {
			return Logger('error', 'MySQL', 'Incorrect data went to logging util, '+e);
		}
	}
}

// - - - - - - - - - - - - - - - Utilities - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Logger.util = {
	getDateString: function(a) {
		date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var str = '';
		str += year + '-';
		str += month<10?'0':'';
		str += month + '-';
		str += day<10?'0':'';
		str += day;
		return str;
	},
	capitiliseFirstLetter: function(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
	},
	formatTimestamp: function(a) {
		date = a;
		var milliseconds = date.getMilliseconds();
		var seconds = date.getSeconds();
		var minutes = date.getMinutes();
		var hours = date.getHours();
		var str = '';
		str += hours<10?'0':'';
		str += hours + ':';
		str += minutes<10?'0':'';
		str += minutes + ' ';
		str += seconds<10?'0':'';
		str += seconds + 's ';
		str += milliseconds<100?'0':'';
		str += milliseconds<10?'0':'';
		str += milliseconds + 'ms';
		return str;
	},
	getWord: function(number) {
		switch(number) {
			case 1: return 'first'
			break;
			case 2: return 'second'
			break;
			case 3: return 'third'
			break;
			case 4: return 'fourth'
			break;
			default: return number;
		}
	}
}


var catchUncaught = function() {
	//For production certified code only!
	if (Logger.core.settings.catchUncaught === true) {
		process.on('uncaughtException', function(e) {
		    Logger('error', 'Exception', 'Logger caught exception: '+e.stack);
		});
	}
};

var catchExit = function() {
	if (Logger.core.settings.catchExit === true) {
		process.on('exit', function(e) {
	    	Logger('error', 'Caught Exit', 'Logger caught exit with code: ' + e);
		});
	}
};

ipify(function (err, ip) {
	IP = ip;
	if (Logger.core.settings.defaultLocation === "ip") {
		if (Logger.core.settings.location !== "127.0.0.1" || Logger.core.settings.location !== "undefined") {
			Logger.core.settings.location = ip;
		}
	}
});


try {
	var dir = path.resolve(__dirname, "../../");
	var config = require(dir+"/jethro.json");
	Logger.init(config);
	Logger('success', 'Logger', 'Found jethro.json, initialising...')
} catch (e) {
	//Config not found
}

module.exports = Logger;