# Jethro API Docs [![Build Status](https://travis-ci.org/JethroLogger/Jethro.svg?branch=master)](https://travis-ci.org/JethroLogger/Jethro) [![npm version](http://img.shields.io/npm/v/jethro.svg)](https://npmjs.org/package/jethro) [![npm downloads](http://img.shields.io/npm/dm/jethro.svg)](https://npmjs.org/package/jethro) [![Gratipay](http://img.shields.io/gratipay/Hunchmun.svg)](https://www.gratipay.com/Hunchmun/)


##  Direct-to-console logging
```
logger.output({
	severity:'warning', 
	source:'Logger',
	message:'Logger is already initialised!',
	timestamp: new Date(),
	location: os.hostname()
});
```

Just remember, using this method ONLY outputs to console, and no other transport is used and no event is emitted. It's basically a fancy console log, useful for welcome messages etc.
