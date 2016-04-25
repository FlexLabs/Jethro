function Transport() {}

/* Public */

//Events
Transport.prototype.addEvent = function(str){
    if (this._settings.events.indexOf(str) === -1) {
        this._settings.events.push(str);
    } return this;
};

Transport.prototype.removeEvent = function(str){
    if (this._settings.events.indexOf(str) > -1) {
        //Remove event
    } return this;
};

//Enable/Disable transport
Transport.prototype.disable = function(){
    this._settings.enabled = false;
    return this;
};

Transport.prototype.enable = function(){
    this._settings.enabled = true;
    return this;
};

Transport.prototype.enabled = function(){
    return this._settings.enabled;
};

Transport.prototype.disabled = function(){
    return !this._settings.enabled;
};

//Colour
Transport.prototype.disableColour = function(){
    this._settings.colour.enabled = false;
    return this;
};

Transport.prototype.enableColour = function(){
    this._settings.colour.enabled = true;
    return this;
};

//Whitelist
Transport.prototype.addToWhitelist = function(str){
    if (this._settings.source.whitelist.indexOf(str) === -1){
        this._settings.source.whitelist.push(str)
    } return this;
};

Transport.prototype.removeFromWhitelist = function(str){
    //Remove element from white list
};

//Blacklist
Transport.prototype.addToBlacklist = function(str){
    if (this._settings.source.blacklist.indexOf(str) === -1){
        this._settings.source.blacklist.push(str)
    } return this;
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
    return this;
};

Transport.prototype.enableTimestamp = function(){
    this._settings.timestamp.enabled = true;
    return this;
};

Transport.prototype.setFormat = function(data) {
    this._settings.timestamp.format = data;
    return this;
};

Transport.prototype.setUTC = function(data) {
    if (data === true || data === false){
        this._settings.timestamp.utc = data;
    } return this;
};

Transport.prototype.setBrackets = function(data) {
    if (data === true || data === false){
        this._settings.timestamp.brackets = data;
    } return this;
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