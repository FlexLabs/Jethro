function Transport(){}

//Private
Transport.prototype.formatString = require('./utils/formatString.js');

Transport.prototype._settings = {
    colour: true,
    enabled: true,
    timestamp: {
        enabled: true,
        format: "undefined",
        utc: false,
        brackets: false
    }, source: {
        whitelist: [],
        blacklist: []
    }, severity: {
        level: "debug"
    }, events: [
       //If empty, listen to all
    ]
};


module.exports = Transport;