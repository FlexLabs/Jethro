var util = require("util");
var EventEmitter = require("eventemitter3");

function Transport(){

}

//Private
Transport.prototype._capitalise = require('./utils/capitalise.js');
Transport.prototype._formatDate = require('./utils/formatDate.js');
Transport.prototype._formatTimestamp = require('./utils/formatTimestamp.js');
Transport.prototype._formatString = require('./utils/formatString.js');
Transport.prototype._getMessage = require('./utils/getMessage.js');
Transport.prototype._getSeverity = require('./utils/getSeverity.js');
Transport.prototype._getSeverityColour = require('./utils/getSeverityColour.js');
Transport.prototype._getSource = require('./utils/getSource.js');
Transport.prototype._getTimestamp = require('./utils/getTimestamp.js');
Transport.prototype._spaceOut = require('./utils/spaceOut.js');

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