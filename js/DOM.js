define([
  'jquery',
  'underscore',
  'asEvented',
  'Controller',
  'DataHandler',
  'Student'], function ($, _, asEvented, Controller, DataHandler, Student) {

  // remember to require dom ready in promises
  var DOM = DataHandler.extend({
    files: {
      'ratedCourses': 'data/course.csv',
      'students': 'data/student.csv',
      'testcases': 'data/test.csv'
    },

    init: function () {

      var self = this;
      $(function () {
        self.bindQueryListener();
        self.bindBatchListener();
        self.bindBackListeners();

        new Controller(self);
      });
    },

    loadFile: function (location) {
      return $.get(location);
    },

    bindBatchListener: function () {
      var self = this;

      $('form.batch input[type=file]').on('change',function (e) {
        e.preventDefault();
        var reader = new FileReader();
        reader.onloadend = function (e) {
          if (e.target.readyState == FileReader.DONE) {
            self.trigger('submit:batch', self.parseTestcases(reader.result));
          }
        };
        reader.readAsText(e.target.files[0]);
      })
    },

    bindQueryListener: function () {
      var self = this;
      // listen for submit
      $('form.query').on('submit',function (e) {
        e.preventDefault();
        var student = processStudentQuery($(this).serializeArray());
        self.trigger('submit:query', student);
        return false;
      });

      function processStudentQuery(formArr) {
        // define which order we want the student data
        var order = _.values(Student.structure);

        // sort values with defined order
        formArr.sort(function (valObj) {
          return -order.indexOf(valObj.name);
        });

        // make data a comma separated line, so we can parse it as a csv
        var line = _.map(formArr,function (valObj) {
          return valObj.value;
        }).join(',');

        // return parsed student
        var student = self.parseLine(line, Student, Student.structure);
        return student;
      }
    },

    bindBackListeners: function() {

      $(document).on("click", "a.query-back", function(){
        $('.query.result').hide();
        $('form.query').show()[0].reset();
      });

      $(document).on("click", "a.batch-back", function(){
        $('.batch.result').hide();
        $('form.batch').show()[0].reset();
      });
    },

    displayQueryResults: function(results) {
      var template = $('.template.query-result').html();
      var compiled = _.template(template, {results:results});

      $('form.query').hide();
      $('.result.query').html(compiled).show();
    },

    displayBatchResults: function(results) {
      var template = $('.template.batch-result').html().trim();
      var compiled = _.template(template, {results:results});

      $('form.batch').hide();
      $('.result.batch').html(compiled).show();

     // (pass, "Incorrect recommendation. {0} ({1}), {2} ({3}), {4} ({5})"
      //  .format(r[0]._id,t[0]._id,r[1]._id,t[1]._id,r[2]._id,t[2]._id));

    }
  });

  asEvented.call(DOM.prototype);

  return DOM;
});