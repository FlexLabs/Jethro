var logger = require('../lib/index.js');
//var logger = new Jethro();

// We'll just accept that this will probably never work again - but that's ok, it's after a constructed element
// We'll assume if anyone has actually already constructed a new Jethro instance, they know what they are doing and
// Shouldn't be confused with this (soon to be documented) behaviour
// logger("info", "this is", "Just a test");


function test() {
    logger("info", "constructor", "something");
    logger.log('info', "startup", "Test");
    logger.log('error', "startup", "Test");
    logger.log('warning', "startup", "Test");
    logger.log('transport', "startup", "Test");
    logger.log('success', "startup", "Test");
    logger.log('debug', "startup", "Test");
    logger.log('debug', "Message", {yolo: true});
}

//logger.setBrackets(true);

logger.log('info', 'Core - ', 'Initating timer...', new Date("2016-05-19 10:41:36"));

//logger.setColour(false);

setInterval(function(){
	logger.log('debug', 'Node.js', "Self.timer")
}, 5000);

logger.emit('logger', {message:"Event Emitter", severity:"transport", source:"Event"});
logger.direct({message:"hi", severity:"transport", source:"Output"});
console.log("Custom methods test");
logger.info("startup", "Test");
logger.transport("startup", "Test");
logger.debug("startup", "Test");
logger.success("startup", "Test");
logger.warn("startup", "Test");
logger.warning("startup", "Test");
logger.error("startup", "Test");
logger.fatal("startup", "Test");
console.log("Starting test procedure");

testProcedure();

function testProcedure(){
    test();
    console.log("Enabling brackets...");
    logger.enableBrackets();
    test();
    console.log("Disabling colour...");
    logger.disableBrackets().disableColour();
    test();
    console.log("Disable bold...");
    logger.enableColour().disableBoldColour();
    test();
    console.log("Disable timestamp...");
    logger.enableBoldColour().disableTimestamp();
    test();
    console.log("Enable UTC");
    logger.enableTimestamp().enableUTC();
    test();
    console.log("Disable UTC");
    logger.disableUTC();
    test();
    console.log("Set timestamp format");
    logger.setTimestampFormat(null, "MMMM Do YYYY, h:mm:ss a");
    test();
    console.log("Reset timestamp");
    logger.resetTimestampFormat();
    test();
}

/*
 * Notes:
 *
 * Bold not implemented
 *
 * Enable/disable timestamp not implemented
 *
 *
 */