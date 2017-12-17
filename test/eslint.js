"use strict";

var lint = require("mocha-eslint");
var paths = [
    "examples/**/*.js",
    "lib/**/*.js",
    "test/**/*.js"
];

lint(paths);
