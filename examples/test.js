logger = require('../')

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
		file: true
	},
	quickStart: false,
	catchUncaught: false,
	catchExit: false
})

setInterval(function(){
	logger.emitter.emit('chat', {message:"hi", output:true, severity:"warning", source:"test"})
}, 2000)

/*
logger('info', "startup", "Test")
logger('error', "startup", "Test")
logger('warning', "startup", "Test")
logger('transport', "startup", "Test")
logger('success', "startup", "Test")
logger('debug', "startup", "Test")
*/

//logger.server()
//logger.client()
//logger.file()
//logger.database()



//logger('success', 'Core - ', 'Finished the testing procedure!')

logger('info', 'Core - ', 'Initating timer...')

setInterval(function(){
	logger('debug', 'Node.js', "Self.timer")
}, 10000)