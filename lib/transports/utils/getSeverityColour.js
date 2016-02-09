var chalk = require('./../chalk.js');

module.exports = function(s){
    if (this._settings.colour ) {
        switch (s.toLowerCase()) {
            case 'success':     return chalk.success(s);
            case 'transport':   return chalk.transport(s);
            case 'debug':       return chalk.debug(s);
            case 'info':        return chalk.info(s);
            case 'warning':     return chalk.warning(s);
            case 'error':       return chalk.error(s);
            default:            return s;
        }
    } else {
        return s;
    }
};