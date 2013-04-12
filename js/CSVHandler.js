define(['jquery', 'underscore', 'underscore.string'], function ($, _, _s) {
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
  CSVHandler.prototype.parse = function (Container, csv) {
    var self = this;

    // initialize array for objects
    var containers = [];
    // split csv data into array of lines
    var lines = csv.split('\n');
    // iterate over each line
    lines.forEach(function (line) {
      // ignore comments
      if (!_s.startsWith(line, '#')) {
        containers.push(self.parseLine(Container, line));
      }
    });
    return containers;
  };

  CSVHandler.prototype.parseLine = function (Container, line) {
    var structure = Container.structure;
    // initialize object
    var container;
    // initialize various variables
    var values, property, i, parsed;

    // split line into values
    values = line.split(',');
    // initialize value key
    i = 0;
    // construct container object
    container = new Container();
    // iterate over properties in structure object
    for (property in structure) {
      // ignore irrelevant properties
      if (structure.hasOwnProperty(property)) {
        // need to handle Booleans as special case because Boolean('0') -> true
        if (structure[property] === Boolean) {
          parsed = values[i].toBoolean();
        }
        // if value is an empty string, set it to null
        else if (values[i] === "") {
          parsed = null;
        }
        // convert values according to structure object
        else {
          parsed = structure[property](values[i]);
        }
        // assign property to parsed value
        container[property] = parsed;
      }
      i++;
    }

    return container;
  };

  CSVHandler.prototype.load = function (url, callback) {
    return $.ajax({
      'url': url,
      'contentType': "text/csv",
      'success': callback
    });
  };

  /**
   *
   *
   **/
  CSVHandler.prototype.loadParse = function (Container, url, callback) {
    var self = this;

    return $.when(this.load(url, callback))
      .then(function (data) {
        return self.parse(Container, data);
      });
  };

  return new CSVHandler();

});



