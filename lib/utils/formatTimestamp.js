var formatTimestamp = function(a, utc) {
    var date, milliseconds, seconds, minutes, hours, str;

    if (utc) {
        date = a;
        milliseconds = date.getUTCMilliseconds();
        seconds = date.getUTCSeconds();
        minutes = date.getUTCMinutes();
        hours = date.getUTCHours();
    } else {
        date = a;
        milliseconds = date.getMilliseconds();
        seconds = date.getSeconds();
        minutes = date.getMinutes();
        hours = date.getHours();
    }
    str = '';
    str += hours < 10 ? '0' : '';
    str += hours + ':';
    str += minutes < 10 ? '0' : '';
    str += minutes + ' ';
    str += seconds < 10 ? '0' : '';
    str += seconds + 's ';
    str += milliseconds < 100 ? '0' : '';
    str += milliseconds < 10 ? '0' : '';
    str += milliseconds + 'ms';
    return str;
};

module.exports = formatTimestamp;
