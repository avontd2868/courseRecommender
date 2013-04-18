// configure dependency paths to CDN
require.config({
  baseUrl: "js",
  paths: {
    "jquery": "lib/jquery.min",
    "underscore": "lib/underscore-min",
    "underscore.string": "lib/underscore.string.min",
    "backbone": "lib/backbone-min",
    "domReady": "lib/domReady",
    "sylvester": "lib/sylvester",
    "asEvented": "lib/asEvented.min",
    "q": "lib/q.min"
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      exports: 'Backbone'
    }

  }
});

require(['Main', 'DOM', 'Utility'], function(Main, DOM, Utility) {
  new Main(window, DOM);
});
