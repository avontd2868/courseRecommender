define(['q', 'underscore', 'underscore.string'], function (Q, _, _s) {
  "use strict";

  function CSVHandler() {

  }

  /**
   *  Parses comma separated data into array of javascript objects of given type
   * The Container objects are required to have a 'structure' object, which contains properties
   * and their parse objects as keys.
   * Example: [Container, Container, Container...]
   *
   **/
  CSVHandler.prototype.parse = function (Container, structure, csv) {
    var self = this;

    if(!csv) {
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
        containers.push(self.parseLine(Container, structure, line));
      }
    });
    return containers;
  };

  /**
   * Converts a comma separated text line of properties into an object of type fConstructor
   * @param Constructor
   * @param structure
   * @param line
   * @returns {Constructor}
   */
  CSVHandler.prototype.parseLine = function (Constructor, structure, line) {
    if(!_.isObject(structure)) {
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

        // if value is an empty string, set it to null
        if (values[i] === "") {
          parsed = null;
        }
        // Boolean('0') === true
        else if(structure[property] === Boolean) {
          parsed = toBoolean(values[i]);
        }
        // parse values with constructor functions in structure object
        else {
          parsed = structure[property](values[i]);
        }
        // store parsed value in parameter object
        params[property] = parsed;

        // we don't have any more values
        if(++i === values.length) {
          break;
        }
      }
    }

    //console.log(Constructor.name, params);
    return new Constructor(params);
  };

  /**
   *
   *
   **/
  CSVHandler.prototype.loadParse = function (Container, structure, url) {
    var self = this;
    return Q.when(this.load(url))
      .then(function (data) {
        return self.parse(Container, structure, data);
      });
  };

  CSVHandler.prototype.load = function (location) {
    return _context.loadFile(location, 'text/csv');
  };

  function toBoolean(str) {
    switch (str) {
      case "true": case "yes": case "1":return true;
      case "false": case "no": case "0":return false;
      default: return Boolean(str);
    }
  }


  return new CSVHandler();
});



