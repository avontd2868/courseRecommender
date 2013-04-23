define(['q', 'underscore', 'underscore.string'], function (Q, _, _s) {
  "use strict";

  var CSVParser = Class.extend({
    /**
     * Parses comma separated data into array of javascript objects of given type
     * Example: [Container, Container, Container...]
     **/
    parse: function (csv, Container, structure) {
      var self = this;

      if (!csv) {
        throw new Error('ParseError: No data to parse.');
      }

      // initialize array for objects
      var containers = [];
      // split csv data into array of lines
      var lines = csv.split('\n');
      // iterate over each line
      lines.forEach(function (line) {
        // ignore comments
        if (!_s.startsWith(line, '#')) {
          containers.push(self.parseLine(line, Container, structure));
        }
      });
      return containers;
    },

    /**
     * Converts a comma separated text line of properties into an object of type Constructor
     * @param line
     * @param Constructor
     * @param structure
     * @returns {Constructor}
     */
    parseLine: function (line, Constructor, structure) {
      if (!_.isObject(structure)) {
        throw new Error('ParseError: Need structure object to parse line.');
      }
      // split line into values
      var values = line.split(',');
      // initialize parameter object
      var params = {};
      // initialize various variables
      var property, i, parsed;
      // initialize value incrementer
      i = 0;
      // iterate over properties in structure object
      for (property in structure) {
        // ignore irrelevant properties
        if (structure.hasOwnProperty(property)) {

          if (values[i].match(/^[0-9]+$/)) {
            values[i] = Number(values[i]);
          }

          // if value is an empty string, set it to null
          if (values[i] === "") {
            parsed = null;
          }

          // need to handle booleans specially
          else if (structure[property] === Boolean) {
            parsed = this.toBoolean(values[i]);
          }
          // parse values with constructor functions in structure object
          else {
            parsed = structure[property](values[i]);
          }
          // store parsed value in parameter object
          params[property] = parsed;

          // we don't have any more values
          // allows values and structure to be of different length
          if (++i === values.length) {
            break;
          }
        }
      }

      //console.log(Constructor.name, params);
      return new Constructor(params);
    },

    toBoolean: function (str) {
      switch (str) {
        case "true":
        case "yes":
        case "1":
          return true;
        case "false":
        case "no":
        case "0":
          return false;
        default:
          return Boolean(str);
      }
    }
  });

  return new CSVParser();
});