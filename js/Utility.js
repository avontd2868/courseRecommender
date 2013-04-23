define(['lib/Class', 'underscore'], function (Class, _) {

  return function (global) {

    // make Class global
    global.Class = Class;

    global.L = console.log;

    /**
     * Extend underscore.js (_)
     */
    _.mixin({
      /**
       * permissive sum() method to array
       */
      sum: function (list) {
        var total = 0;
        this.each(list, function (x) {
          if (!isNaN(parseFloat(x)) && isFinite(x)) {
            total += x;
          }
        });
        return total;
      },

      /**
       * Shorthand avg() method
       */
      avg: function (list) {
        return this.size(list) > 0 ? this.sum(list) / this.size(list) : 0;
      }
    });

    /**
     * "{0} little {1}".format("hello", "world")
     */
    if (!String.prototype.format) {
      String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
          return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
        });
      };
    }

    global.constructMatrix = function (a, b, func) {
      var matrix = [];
      var row;
      a.forEach(function (itemA) {
        row = [];
        b.forEach(function (itemB) {
          row.push(func(itemA, itemB));
        });
        matrix.push(row);
      });
    }
  }

});