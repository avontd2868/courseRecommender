define(['underscore'], function (_) {

  return function (root) {

    /**
     * Extend underscorew
     */
    _.mixin({
      /**
       * permissive sum() method to array
       */
      sum: function () {
        var total = 0;
        this.forEach(function (x) {
          if (!isNaN(parseFloat(x)) && isFinite(x)) {
            total += x;
          }
        });
        return total;
      },

      /**
       * Shorthand avg() method
       */
      avg: function () {
        return this.length > 0 ? this.sum() / this.length : 0;
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

    root.constructMatrix = function (a, b, func) {
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