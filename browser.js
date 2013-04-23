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
    "numeric": "lib/numeric-1.2.6.min",
    "q": "lib/q.min"
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      exports: 'Backbone'
    },
    'numeric': {
      exports: 'numeric'
    }
  }
});

require(['Utility'], function(Utility) {
  Utility(window);
  require(['DOM'], function (DOM) {
    new DOM();
  });
});


