module.exports = {

	capitiliseFirstLetter: function(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
	},

	formatTimestamp: function(a) {
		date = a;
		var milliseconds = date.getMilliseconds();
		var seconds = date.getSeconds();
		var minutes = date.getMinutes();
		var hours = date.getHours();
		var str = '';
		str += hours<10?'0':'';
		str += hours + ':';
		str += minutes<10?'0':'';
		str += minutes + ' ';
		str += seconds<10?'0':'';
		str += seconds + 's ';
		str += milliseconds<1000?'0':'';
		str += milliseconds<100?'0':'';
		str += milliseconds<10?'0':'';
		str += milliseconds + 'ms';
		return str;
	}
};