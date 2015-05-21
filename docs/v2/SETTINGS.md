# Jethro Settings [![Build Status](https://travis-ci.org/JethroLogger/Jethro.svg?branch=master)](https://travis-ci.org/JethroLogger/Jethro) [![npm version](http://img.shields.io/npm/v/jethro.svg)](https://npmjs.org/package/jethro) [![npm downloads](http://img.shields.io/npm/dm/jethro.svg)](https://npmjs.org/package/jethro) [![Gratipay](http://img.shields.io/gratipay/Hunchmun.svg)](https://www.gratipay.com/Hunchmun/)

Settings in detail
------------------

The Settings Object:

```json

{
  "location": "undefined",
  "timeformat": "undefined",
  "output": {
    "console": true,
    "timestampOpts": {
      "brackets": false
    }
  }
}
```

This can be set by using the set method. A settings object must be passed replacing ALL setting objects stated above.

```js

var logger = require('jethro');

```

Location
--------

Location is the how this logger instance will show up to a server that it communicates with, if applicable.

Time Format 
-----------

The formatting of the timestamp parameter. Defaults to something like: `[16:31 48s 0076ms]`

An example of how it can be set is: 'DD MMM HH:mm:ss' or any other string that the 'moment' module supports

Brackets can be added or removed by stating `output.timestampOpts.brackets` as true or false respectively.

Output
------

#### Console

output.console: disables the default event listener for emitting to the console.
