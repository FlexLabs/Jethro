var settings = require('../settings.js');
var Logger = require('../core.js');

if (settings.errors.catchUncaught === true) {
    process.on('uncaughtException', function(e) {
        Logger('error', 'Exception', 'Logger caught exception: ' + e);
    });
}