logger = require('../')

logger.init({
	timeformat:"DD MMM HH:mm:ss",
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
		},
		timestampOpts: {
			brackets: true
		}
	}
})

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