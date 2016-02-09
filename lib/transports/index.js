function Transport() {}

//Private
Transport.prototype.formatString = require('./utils/formatString.js');

Transport.prototype.input = function(data){
    if (typeof this.output === "function"){
        this.output(data);
    } else {
        throw new Error("No output prototype found for transport");
    }
};

Transport.prototype._settings = {
    colour: {
        enabled: true,
        force: true
    },
    enabled: true,
    timestamp: {
        enabled: true,
        format: "undefined",
        utc: false,
        brackets: false
    },
    source: {
        whitelist: [],
        blacklist: []
    },
    severity: {
        level: "debug"
    },
    events: [
        //If empty, listen to all
    ]
};


module.exports = Transport;
