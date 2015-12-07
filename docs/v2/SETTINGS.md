# Jethro Settings [![Build Status](https://travis-ci.org/JethroLogger/Jethro.svg?branch=master)](https://travis-ci.org/JethroLogger/Jethro) [![npm version](http://img.shields.io/npm/v/jethro.svg)](https://npmjs.org/package/jethro) [![npm downloads](http://img.shields.io/npm/dm/jethro.svg)](https://npmjs.org/package/jethro) [![Gratipay](http://img.shields.io/gratipay/Hunchmun.svg)](https://www.gratipay.com/Hunchmun/)

Settings in detail
------------------

The Settings Object:

```json

{
  "location": "undefined",
  "timeformat": "undefined",
  "output": {
    "source":{
      "whitelist": [],
      "blacklist": []
    },
    "colour": true,
    "timestamp": true,
    "console": true,
    "timestampOpts": {
      "brackets": false
	  "utc": false
    }
  }
}
```

This can be set by using the `logger.set(obj)` method. A settings object must be passed replacing ALL setting objects stated above.

```js

var logger = require('jethro');

logger.set(SettingsObject);

```

**__All of the below options are exposed via the logger.settings object__**

For example: 

```js

logger.setBrackets(true);

logger.setUTC(true);

logger.setConsole(false);

logger.setTimestamp(false);

//A full list of these are below
```

Options
-------

#### Location

Location is the how this logger instance will show up to a server that it communicates with, if applicable.

Accessible via ```logger.setLocation(variable)``` or ```logger.settings.location = "127.0.0.1"```

#### Timeformat

The formatting of the timestamp parameter. Defaults to something like: `16:31 48s 0076ms`

An example of how it can be set is: 'DD MMM HH:mm:ss' or any other string that the 'moment' module supports

Accessible via ```logger.setTimeformat(variable)``` or ```logger.settings.timeformat = "DD MMM HH:mm:ss"```

Brackets can be added or removed by stating `logger.settings.output.timestampOpts.brackets` as true or false respectively.

Output
------

#### Console

output.console: disables the default event listener for emitting to the console.

Accessible via ```logger.setConsole(boolean)```

#### Colour

Boolean containing whether the output function strips colour codes from itself or not

Accessible via ```logger.setColour(boolean)```

#### Timestamp

Boolean turning off the output of a timestamp, necessary if your hosting provider already uses this in their logs

Accessible via ```logger.setTimestamp(boolean)```

#### UTC

Boolean enabling or disabling UTC time format, necessary if you do not know the timezone of your hosting provider

Accessible via ```logger.setUTC(boolean)```

#### Brackets 

Boolean disabling or enabling _timestamp_ brackets

Accessible via ```logger.setBrackets(boolean)```

Blacklisting and White listing
------------------------------

* Next Update!


