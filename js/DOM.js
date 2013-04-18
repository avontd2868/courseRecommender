define(['Student',
  'Testcase',
  'CSVHandler',
  'jquery',
  'underscore',
  'asEvented'], function (Student, TestCase, CSVHandler, $, _, asEvented) {

  // remember to require dom ready in promises
  function DOM() {
    var self = this;
    $(function() {
      self.bindStudentQuery();
      self.bindTestcaseExec();
    });
  }

  asEvented.call(DOM.prototype);

  DOM.prototype.loadFile = function(location, type) {
    return $.ajax({
      'url': location,
      'contentType': type
    });
  };

  // listen for batch test
  DOM.prototype.bindTestcaseExec = function() {
    var self = this;
    $('.batch-test').change(function (e) {
      e.preventDefault();
      var reader = new FileReader();
      reader.onloadend = function (e) {
        if (e.target.readyState == FileReader.DONE) {
          self.trigger('submit:testcases', TestCase.fromCSV(reader.result));
        }
      }
      reader.readAsText(e.target.files[0]);
    })
  };

  DOM.prototype.bindStudentQuery = function() {
    var self = this;
    // listen for submit
    $('.get-recommendation').submit(function (e) {
      e.preventDefault();

      var student = processStudentQuery($(this).serializeArray());
      self.trigger('submit:student', student);
    });
  };


  function processStudentQuery(formArr) {
    // define which order we want the student data
    var order = _.values(Student.structure);

    // sort values with defined order
    formArr.sort(function (valObj) {
      return -order.indexOf(valObj.name);
    });

    // make data a comma separated line, so we can parse it as csv
    var line = _.map(formArr,function (valObj) {
      return valObj.value;
    }).join(',');

    // return parsed student
    return CSVHandler.parseLine(Student, Student.structure, line);
  }

  return new DOM();
})