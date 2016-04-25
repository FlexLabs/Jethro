var logger = require('../lib/index.js');

setInterval(function(){
    logger.emit('logger', {message:"Event Emitter", severity:"transport", source:"Event"});
}, 2000);

setInterval(function(){
    logger.direct({message:"hi", severity:"transport", source:"Output"});
}, 5000);

logger("info", "constructor", "something");

logger.log('info', "startup", "Test");
logger.log('error', "startup", "Test");
logger.log('warning', "startup", "Test");
logger.log('transport', "startup", "Test");
logger.log('success', "startup", "Test");
logger.log('debug', "startup", "Test");

logger.log('debug', "Message", {yolo:true});

//logger.setBrackets(true);

logger.log('info', 'Core - ', 'Initating timer...');

//logger.setColour(false);

setInterval(function(){
	logger.log('debug', 'Node.js', "Self.timer")
}, 5000);

setTimeout(function(){
    logger.log('success', 'Core - ', 'Finished the testing procedure!');
    process.exit(0);
}, 8 * 1000);

setTimeout(function() {
    console.log("Custom methods test");
    logger.info("startup", "Test");
    logger.transport("startup", "Test");
    logger.debug("startup", "Test");
    logger.success("startup", "Test");
    logger.warn("startup", "Test");
    logger.warning("startup", "Test");
    logger.error("startup", "Test");
    logger.fatal("startup", "Test");
}, 5000);