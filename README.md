# Jethro [![Build Status](https://travis-ci.org/JethroLogger/Jethro.svg?branch=master)](https://travis-ci.org/HenchSpace/Jethro) [![npm version](http://img.shields.io/npm/v/jethro.svg)](https://npmjs.org/package/jethro) [![npm downloads](http://img.shields.io/npm/dm/jethro.svg)](https://npmjs.org/package/jethro) [![Gratipay](http://img.shields.io/gratipay/Hunchmun.svg)](https://www.gratipay.com/Hunchmun/)

Jethro Logger is an all-in-one logging utility designed to give developers the logging tools and flexibility they need within one complete package. It is also designed to be used in cooperation with other tools and transport services.

Feel free to visit the HenchSpace website [here.](https://henchspace.co/)


Installation
------------
`npm install jethro`

## Usage

######Command line arguments:
`node app.js -output false`

-output true or false will allow or mute the console output, but will not effect the internal emitter

######Alternatively, other settings can be used as follows:
```js

logger = require('jethro')

//Initialises the logger

logger.init({
	defaultLocation: "ip",
	location: "undefined",
	timeformat: "undefined",
	output: {
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
	},
	modules: {
		socket: false,
		file: false
	},
	quickStart: false,
	catchUncaught: false,
	catchExit: false
})
```
To initialise the logger with your own settings, you may do so with this snippet. You can include as many or as little of these settings as you wish, the ones that you do not include will be defaulted to the ones that are displayed above.
	If you decide to edit things inside a nested setting, such as the output object, then you should include all of the settings that are displayed inside of it. I will write a proper settings setter in the future to make this not be the case. If you do not do this, you risk overwriting the object/variables that you do not set, with undefined. This does not apply to root settings such as location or timeformat, they can be left not defined within the init and still will be defaulted.
	However, init is called upon sending the first message, init settings will be the default ones in this case. The first message that is sent will be delayed and this is a bug that will be fixed shortly!

## Settings in detail

##### location

The location that is given as a parameter of the log. Defaults to ip address using the ipify module if undefined. 
defaultLocation can be set to "ip" or "hostname". "hostname" utilises os.hostname().
You can also just set location manually as logger.core.settings.location = "Somewhere";

##### timeformat 

The formatting of the timestamp parameter. Defaults to something like: [16:31 48s 0076ms]

An example of how it can be set is: 'DD MMM HH:mm:ss' or any other string that the 'moment' module supports

##### output

displayOpts: if set to false, will not display locally. (the strings will still be sent to the socket and database)

sourceOpts: Allows sources to be allowed and disallowed (whitelist/blacklist) //not implemented

##### quickStart

Bypasses startup messages if set to true.

##### catchUncaught and catchExit

Starts listeners for process.on('exit') and ('uncaughtException')
It is not recommended to use the uncaughtException unless you want to prevent your app from fatally closing!

The API
-------

In order to account for all needs and desires I have tried to make any and all useful functions and variables exported and available in the public API. As time goes on I hope to fine tune this by removing things that aren't useful and are potentially annoying or dangerous as exported, but also offering a plethora of functions that can be used outside of the logger, although these might get moved to another module if they become too big in the future.

If you have any recommendations, suggestions or ideas regarding the API, do not hesitate to let me know!  

## Settings

##### Set settings after init
```
logger.settings.set(options)
```

##### Set the settings manually
```
logger.core.settings : {}
```
```
var os = require('os')
logger.core.settings.location = os.hostname()
```
However it is much preferred that you use the set settings method as this will initialise functions or other methods that need to be restarted with the new settings...

##  Direct-to-console logging
```
logger.output({
	severity:'warning', 
	source:'Logger',
	message:'Logger is already initialised!',
	timestamp: new Date(),
	location: os.hostname()
});
```
Just remember, using this method ONLY outputs to console, and no other transport is used and no event is emitted. It's basically a fancy console log, useful for welcome messages etc.
```
//Alternatively

var Return = true;

console.log(logger.output(data, Return));
```
However, if a true value is passed as the second argument, then output() will return rather than doing a direct console log. This method was added to allow for quick and easy formatting of logs for writing to file or a custom transport method

## Event Emitter

###### The emitter:
```
logger.emitter.emit('logger', data)
```
This will emit straight into the matrix, make sure to be careful with emitted data, that it is correctly formatted and will not cause any of the other listeners and modules to error out

```logger.emitter.emit('chat', {message:"hi", output:true, severity:"warning", source:"test", })```

Used for emtting to a seperate logging file (jethro-file), the event name becomes the folder that logs are saved to.

###### The listener:
```
logger.emitter.on('logger', function(data){
	console.log(data)
});
```

## Utilities

Potentially moving to a new repository...
```
logger.util.capitiliseFirstLetter(string)
```
Will capitilise the first letter of the string and return it

```
logger.util.formatTimestamp(timestamp) 
```
Will format the timestamp in the default manner


Express Middleware
------------------

Simple placeholder logging utility!

```
var logger = require('jethro');
app.use(logger.express); //That's it!
```

Note: The statuscode will always return 200 (I think), I need more time to sit and play with Express


Transports
----------

##Jethro File

Logger.core.settings.modules.file must be true

Logger.init({
	modules: {
		file: true
	}
});

To save to a different folder use an event: `logger.emitter.emit('chat', {message:"hi", output:true, severity:"warning", source:"test"})`


More features Coming!
---------------------
* Better/improved API with more transport options, methods and settings
* Basic level of file logging
* Logger Web/socket server
* Logger socket client
* Database transport

Projects using this logger
--------------------------
* HenchBot
* HenchSpace backend infrastructure
* TFL Bot (plug.dj)

Credits
-------
Birthed by [Henchman](https://hench.in), with help from [Matthew](https://github.com/yemasthui).

Help, suggestions and moral support from [xBytez](https://github.com/xBytez) and [Alex](http://thedark1337.com)!

License
-------
Licensed under the LGPL v3 License

Copyright (C) 2014  Samuel Mills (known as Henchman, under the github team: HenchSpace)

You can find full license [here.](https://github.com/HenchSpace/Jethro/blob/master/LICENSE.txt)
