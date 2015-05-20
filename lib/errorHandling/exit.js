var settings = require('../settings.js');
var Logger = require('../core.js');

if (settings.errors.catchExit === true) {
    process.on('exit', function(e) {
        Logger('error', 'Caught Exit', 'Logger caught exit with code: ' + e);
    });
}