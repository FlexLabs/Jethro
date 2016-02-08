module.exports = function(message, distance){
    var sp = distance - message.length;
    for(var j = 0; j< sp; j++) {
        message += ' ';
    } return message;
};