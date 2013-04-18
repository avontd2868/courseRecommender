#!/usr/bin/env node

var requirejs = require('requirejs');

requirejs.config({
  baseUrl:  'js',
  nodeRequire: require
});

requirejs(['Main', 'CLI', 'Utility'], function (Main, CLI, Utility) {
  new Main(global, CLI);
});