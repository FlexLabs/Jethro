var logger = require('../index.js');
/*
setInterval(function(){
	logger.emitter.emit('chat', {message:"hi", output:true, severity:"warning", source:"test"})
}, 2000);
*/
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

logger('info', 'Core - ', 'Initating timer...');

setInterval(function(){
	logger('debug', 'Node.js', "Self.timer")
}, 10000);