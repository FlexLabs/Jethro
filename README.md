# Jethro [![Build Status][travis-badge]][travis-link] [![npm version][npm-badge]][npm-link] [![npm downloads][npmd-badge]][npmd-link] [![Code Climate][cc-badge]][cc-link]

Jethro Logger is an all-in-one logging utility designed to give developers the logging tools and flexibility they need
within one complete package. It is also designed to be used in cooperation with other tools and transport services.

## Usage Notice

This branch is unstable until this notice is removed. This branch is version 3 of Jethro.

We will be following the node.js format of even major Semantic Versioning for stable, odd majors for
unstable/development.

#### Please refer to documentation for [v2.7.1](https://github.com/JethroLogger/Jethro/tree/v2/) as this is the current version on npm


Installation
------------
```npm i jethro --save```


Usage
-----

```js

var logger = require('jethro');

logger("info", "Testing", "This is a test message!");
```

It's as simple as that!

The simple makeup of the logger input is explained within the sections below:

logger( [severity](/docs/v2/SEVERITY.md), [source](/docs/v2/SOURCE.md), [message](/docs/v2/MESSAGE.md))

Here's a screen shot of a potential output:


![Screenshot](https://github.com/JethroLogger/Jethro/blob/v2/docs/v2/i.png "Screen shot")

Examples
--------
* Coming [Soon.tm](http://soon.tm)

The API
-------
* Coming [Soon.tm](http://soon.tm)

Plugins
-------
* Coming [Soon.tm](http://soon.tm)

#### Express

```js
var Jethro = require('../Jethro/lib/index.js');
var logger = new Jethro();
var expressLog = new Jethro.Express();
logger.addPlugin("express", expressLog);
app.use(expressLog.input());
```

or

```js
var logger = require("jethro");
logger.addPlugin("express", new Jethro.Express());
app.use(logger.plugins.express.input());
````

Transports
----------
* Coming [Soon.tm](http://soon.tm)

Settings & Customisations
-------------------------
* Coming [Soon.tm](http://soon.tm)

Other Features
---------------------
* Namespaces
* Error handling

Projects using this logger
--------------------------
* HenchBot
* HenchSpace backend infrastructure
* TFL Bot (plug.dj)

Deprecated Documentation
------------------------
* [Version 2 Documentation](https://github.com/JethroLogger/Jethro/tree/v2/docs/v2/)
* [Version 1 Documentation](https://github.com/JethroLogger/Jethro/blob/v2/docs/v1/README.md)

Credits
-------
Created and maintained [Henchman](https://hench.space).

Helped and maintained with [Alex](http://thedark1337.com).

Suggestions and moral support from [xBytez](https://github.com/xBytez) and [Matthew](https://github.com/yemasthui)!

Special thanks to [ReAnna](https://github.com/goto-bus-stop/) whom without which, version 3+ would not be possible.

License
-------
Licensed under the LGPL-v3 & MIT Licenses

Copyright (C) 2015  Samuel Mills (known as Henchman, under the github teams: JethroLogger & HenchSpace)

Licenses: [LGPL-v3](/LGPLv3-license.txt) AND [MIT](/MIT-.txt)

[travis-badge]: https://travis-ci.org/JethroLogger/Jethro.svg?branch=master
[travis-link]: https://travis-ci.org/JethroLogger/Jethro
[npm-badge]: http://img.shields.io/npm/v/jethro.svg
[npm-link]: https://npmjs.org/package/jethro
[npmd-badge]: http://img.shields.io/npm/dm/jethro.svg
[npmd-link]: https://npmjs.org/package/jethro
[cc-badge]: https://codeclimate.com/github/JethroLogger/Jethro/badges/gpa.svg
[cc-link]: https://codeclimate.com/github/JethroLogger/Jethro


