define(['Student',
  'TestCase',
  'CSVHandler',
  'jquery',
  'underscore',
  'backbone'], function (Student, TestCase, CSVHandler, $, _, Backbone) {

  var dom = new DOM();


  function DOM() {

  }

  _.extend(DOM.prototype, Backbone.Events);

  // listen for submit
  $('.get-recommendation').submit(function (e) {
    e.preventDefault();

    var student = processForm($(this).serializeArray());

    dom.trigger('submit:student', student);

    function processForm(formArr) {
      // define which order we want the student data
      var order = ['student', 'undergrad', 'female', 'local', 'gpa', 'course1', 'course2', 'course3', 'course4'];

      // sort values with defined order
      formArr.sort(function (valObj) {
        return -order.indexOf(valObj.name);
      });

      // make data a comma separated line, so we can parse it as csv
      var line = _.map(formArr,function (valObj) {
        return valObj.value;
      }).join(',');

      // return parsed student
      return CSVHandler.parseLine(Student, line);
    }


  });

  // listen for batch test
  $('.batch-test').change(function (e) {
    e.preventDefault();
    var reader = new FileReader();
    reader.onloadend = function (e) {
      if (e.target.readyState == FileReader.DONE) {
        dom.trigger('submit:testcases', TestCase.fromCSV(reader.result));
      }
    }
    reader.readAsText(e.target.files[0]);
  })


  return dom;
})