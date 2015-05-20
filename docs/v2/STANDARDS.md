# Jethro Code Standards [![Build Status](https://travis-ci.org/JethroLogger/Jethro.svg?branch=master)](https://travis-ci.org/JethroLogger/Jethro) [![npm version](http://img.shields.io/npm/v/jethro.svg)](https://npmjs.org/package/jethro) [![npm downloads](http://img.shields.io/npm/dm/jethro.svg)](https://npmjs.org/package/jethro) [![Gratipay](http://img.shields.io/gratipay/Hunchmun.svg)](https://www.gratipay.com/Hunchmun/)

Jethro has been seemingly adopted by a wide range of anonymous individuals, and has seen considerable growth for something that I thought I would be the only one to be using...

As a result, I have decided to sit down and think about some standards that the product/services/codebase should adhere to, but of course, I am welcome to input from any and all parties. V2 has been such a huge change to the codebase, while I think I am restructuring correctly, there could always be better ways to do things


Applying Best Node.JS Practices
-------------------------------

The codebase needs to apply the best figured node.js practices, in order to benefit the developer, the maintainer, and any other users or those effected by the use of Jethro within a project.


Error Handling
--------------

Where in doubt, refer to the Joyent guide on error handling, [here](http://www.joyent.com/developers/node/design/errors).

1. Uncaught exception must not be be handled within jethro. This applies to with the 'exit' event. 
2. The only exception to this rule, will be for a user to emit an error event through jethro.
3. An error event handled through Jethro, will be handled under special circumstance, and not throw, but log on all accepting transports
4. For users of the module, this means that only __operational__ errors should be emitter.
5. Subsequently, programmer bugs and such, should not be handled or passed through Jethro, but thrown and ultimately fixed.

## Within Transports

Transports must adhere to the following:

1. Transports will respond with callbacks, at all times. A return, is not acceptable. This will be made clear in the standard for writing transports (to come)
2. The first argument of the callback will be the error. This will be null if no error. The second argument will be the success story of the transport.



Keeping The Code Base Clean
---------------------------

* To be completed