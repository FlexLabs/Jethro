var logger = require('../index.js');

setInterval(function(){
	logger.event.emit('logger', {message:"Event Emitter", severity:"transport", source:"Event"})
}, 2000);

setInterval(function(){
	logger.output({message:"hi", severity:"transport", source:"Output"});
}, 5000);


logger('info', "startup", "Test");
logger('error', "startup", "Test");
logger('warning', "startup", "Test");
logger('transport', "startup", "Test");
logger('success', "startup", "Test");
logger('debug', "startup", "Test");

logger.setBrackets(true);


logger('info', 'Core - ', 'Initating timer...');

logger.setColour(false);

setInterval(function(){
	logger('debug', 'Node.js', "Self.timer")
}, 5000);

setTimeout(function(){
    logger('success', 'Core - ', 'Finished the testing procedure!');
    process.exit(0);
}, 8 * 1000);