var chalk = require('chalk');

module.exports = function(s, settings) {
    if (settings.colour ) {
        switch (s.toLowerCase()) {
            case 'success':     return chalk.styles.green.open + s + chalk.styles.green.close;
            case 'transport':   return chalk.styles.cyan.open + s + chalk.styles.cyan.close;
            case 'debug':       return chalk.styles.blue.open + s + chalk.styles.blue.close;
            case 'info':        return chalk.styles.magenta.open + s + chalk.styles.magenta.close;
            case 'warning':     return chalk.styles.yellow.open + s + chalk.styles.yellow.close;
            case 'error':       return chalk.styles.red.open + s + chalk.styles.red.close;
            default:            return s;
        }
    } else {
        return s;
    }
};