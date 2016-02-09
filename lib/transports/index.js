function Transport(){}

//Private
Transport.prototype.formatString = require('./utils/formatString.js');

Transport.prototype._settings = {
    colour: true,
    enabled: true,
    timestamp:{
        enabled: true,
        format: "undefined",
        utc: false,
        brackets: false
    }
};


module.exports = Transport;