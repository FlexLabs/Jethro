# Jethro [![Build Status](https://travis-ci.org/JethroLogger/Jethro.svg?branch=master)](https://travis-ci.org/JethroLogger/Jethro) [![npm version](http://img.shields.io/npm/v/jethro.svg)](https://npmjs.org/package/jethro) [![npm downloads](http://img.shields.io/npm/dm/jethro.svg)](https://npmjs.org/package/jethro) [![Gratipay](http://img.shields.io/gratipay/Hunchmun.svg)](https://www.gratipay.com/Hunchmun/)

Jethro Logger is an all-in-one logging utility designed to give developers the logging tools and flexibility they need within one complete package. It is also designed to be used in cooperation with other tools and transport services.

Feel free to visit the HenchSpace website [here.](https://henchspace.co/)


Installation
------------
`npm i jethro --save`


Usage
-----

```js

logger = require('jethro')

logger("info", "Testing", "This is a test message!");

// AKA: logger(severity, source, message);

```
It's as simple as that!

The API
-------

###### API Docs
This is now [version 2.0.0 documentation](/Jethro/tree/master/docs/v1/API.md), you can read v1 [here](/docs/v1/README.md).

###### Settings
Customisations for the settings can be found [here] (/docs/v2/SETTINGS.md).

##### Plugins
There are many plugins, for express.js, restify, MySQL and more [here](/docs/v2/PLUGINS.md).

Transports
----------
* Undergoing Rewrite

More features Coming!
---------------------
* Undergoing Rewrite

Projects using this logger
--------------------------
* HenchBot
* HenchSpace backend infrastructure
* TFL Bot (plug.dj)

Credits
-------
Birthed by [Henchman](https://hench.in), with help from [Matthew](https://github.com/yemasthui).

Help, suggestions and moral support from [xBytez](https://github.com/xBytez) and [Alex](http://thedark1337.com)!

License
-------
Licensed under the LGPL v3 License

Copyright (C) 2014  Samuel Mills (known as Henchman, under the github team: HenchSpace)

You can find full license [here.](/LICENSE.txt)
