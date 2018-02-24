'use strict';

const stripAnsi = require('strip-ansi');
/**
 * Utilities
 * @constructor
 */
class Utilities {
    constructor() {

    }

    /**
     * @param {string} message The message to space out
     * @param {number} distance how far to space out the message
     * @returns {string} A spaced out string
     */
    spaceOut(message, distance) {
        let sp = distance - stripAnsi(message).length;
        for (let j = 0; j < sp; j++) {
            message += ' ';
        }
        return message;
    }

    /**
     * @param {object} data an object of parameters to check.
     * @returns {boolean} True if the parameters are valid
     */
    isValidOutputParameters(data) {
        return typeof data === 'object' &&
            data != null &&
            typeof data.severity !== 'undefined' &&
            typeof data.source !== 'undefined' &&
            typeof data.message !== 'undefined' &&
            typeof data.timestamp !== 'undefined' &&
            typeof data.namespace !== 'undefined';
    }
}

module.exports = Utilities;
