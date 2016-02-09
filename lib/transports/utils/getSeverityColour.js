var chalk = require('chalk');
var forceChalk = new chalk.constructor({
    enabled: true
});

module.exports = function(s, settings) {
    if (settings.colour.enabled) {
        switch (s.toLowerCase()) {
            case 'success':
                return settings.colour.force ? forceChalk.green.bold(s) : chalk.green.bold(s);
            case 'transport':
                return settings.colour.force ? forceChalk.cyan.bold(s) : chalk.cyan.bold(s);
            case 'debug':
                return settings.colour.force ? forceChalk.blue.bold(s) : chalk.blue.bold(s);
            case 'info':
                return settings.colour.force ? forceChalk.magenta.bold(s) : chalk.magenta.bold(s);
            case 'warning':
                return settings.colour.force ? forceChalk.yellow.bold(s) : chalk.yellow.bold(s);
            case 'error':
                return settings.colour.force ? forceChalk.red.bold(s) : chalk.red.bold(s);
            default:
                return s;
        }
    } else {
        return s;
    }
};
