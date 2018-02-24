'use strict';

const Transport = require('./../index.js');

/**
 * Constructor for the console transport
 * @constructor
 * @example
 * var Jethro = require('jethro');
 * var logger = new Jethro();
 * var jConsole = new Jethro.Console();
 * logger.addTransport("console2", jConsole);
 * @augments Transport
 * @returns {Console} Returns an instance of console.
 */
class Console extends Transport {
    constructor() {
        super();
    }

    /**
     * Output function - logs to console
     * @param {object} data - Data packet to be logged to console
     * @param {string} data.severity - Severity of the log
     * @param {string} data.source - Source of the log
     * @param {string} data.message - Log content
     * @param {Date|string} data.timestamp - Timestamp of the log
     * @param {string} data.namespace - Namespace to broadcast as
     * @param {string} data.location - Location of the application
     */
    output(data) {
        console.log(this.formatString(data));
    }
}

module.exports = Console;
