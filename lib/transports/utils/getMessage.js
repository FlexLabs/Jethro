var util = require('util');

module.exports = function(data) {
    if (typeof data.message === "string") {
        return data.message;
    } else {
        return util.inspect(data.message);
    }
};