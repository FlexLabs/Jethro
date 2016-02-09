function Transport() {}

/* Public */

//Events
Transport.prototype.addEvent = function(str){
    if (this._settings.events.indexOf(str) === -1) {
        this._settings.events.push(str);
    }
};

Transport.prototype.removeEvent = function(str){
    if (this._settings.events.indexOf(str) > -1) {
        //Remove event
    }
};

//Enable/Disable transport
Transport.prototype.disabled = function(){
    this._settings.enabled = false;
};

Transport.prototype.enable = function(){
    this._settings.enabled = true;
};

Transport.prototype.enabled = function(){
    return this._settings.enabled;
};

//Colour
Transport.prototype.disableColour = function(){
    this._settings.colour.enabled = false;
};

Transport.prototype.enableColour = function(){
    this._settings.colour.enabled = true;
};

//Whitelist
Transport.prototype.addToWhitelist = function(str){
    if (this._settings.source.whitelist.indexOf(str) === -1){
        this._settings.source.whitelist.push(str)
    }
};

Transport.prototype.removeFromWhitelist = function(str){
    //Remove element from white list
};

//Blacklist
Transport.prototype.addToBlacklist = function(str){
    if (this._settings.source.blacklist.indexOf(str) === -1){
        this._settings.source.blacklist.push(str)
    }
};

Transport.prototype.removeFromBlacklist = function(str){
    //Remove element from blacklist
};

//Log Level
Transport.prototype.setLogLevel = function(str){
    //Not implemented.
};

//Timestamp
Transport.prototype.disableTimestamp = function(){
    this._settings.timestamp.enabled = false;
};

Transport.prototype.enableTimestamp = function(){
    this._settings.timestamp.enabled = true;
};

Transport.prototype.setFormat = function(data){
    this._settings.timestamp.format = data;
};

Transport.prototype.setUTC = function(data){
    if (data === true || data === false){
        this._settings.timestamp.utc = data;
    }
};

Transport.prototype.setBrackets = function(data){
    if (data === true || data === false){
        this._settings.timestamp.brackets = data;
    }
};

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
    enabled: true,
    colour: {
        bold: true,
        enabled: true,
        force: true
    }, events: [
        //If empty, listen to all
    ], severity: {
        level: "debug"
    }, source: {
        whitelist: [],
        blacklist: []
    }, timestamp: {
        enabled: true,
        format: "undefined",
        utc: false,
        brackets: false
    }
};


module.exports = Transport;
