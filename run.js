#!/usr/bin/env node

var requirejs = require('requirejs');

requirejs.config({
  baseUrl:  'js',
  nodeRequire: require
});

requirejs(['Utility'], function(Utility) {
  Utility(global);
  requirejs(['CLI'], function (CLI) {
    new CLI();
  })
});