var formatTimestamp = function (a, utc) {
	if (utc) {
		var date = a;
		var milliseconds = date.getUTCMilliseconds();
		var seconds = date.getUTCSeconds();
		var minutes = date.getUTCMinutes();
		var hours = date.getUTCHours();
		var str = '';
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
	} else {
		var date = a;
		var milliseconds = date.getMilliseconds();
		var seconds = date.getSeconds();
		var minutes = date.getMinutes();
		var hours = date.getHours();
		var str = '';
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
	}
};

module.exports = formatTimestamp;
