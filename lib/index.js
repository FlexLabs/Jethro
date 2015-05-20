var Logger = require('./core.js');

Logger.prototype.set = function(options) {
    for (var prop in options) {
        if (options.hasOwnProperty(prop)){
            Logger.core.settings[prop] = options[prop];
        }
    }
};
Logger.addToWhiteList = function(parameter, arr) {

};
Logger.addToBlackList = function(parameter, arr) {

};
Logger.setLocation = function(loc) {
    Logger.core.settings.location = loc;
};

module.exports = Logger;