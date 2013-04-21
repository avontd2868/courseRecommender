#!/usr/bin/env node

var requirejs = require('requirejs');

requirejs.config({
  baseUrl:  'js',
  nodeRequire: require
});

requirejs(['Main', 'CLI'], function (Main, CLI) {
  new Main(CLI);
});