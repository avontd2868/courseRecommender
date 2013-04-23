define([
  'q',
  'CSVParser',
  'Course',
  'Student',
  'Testcase'], function (Q, CSVParser, Course, Student, Testcase) {
  "use strict";

  var DataHandler = Class.extend({
    init: function() {

    },

    loadStudents: function () {
      return this.loadParse(this.files.students, Student, Student.structure);
    },

    loadRatedCourses: function () {
      return this.loadParse(this.files.ratedCourses, Course, {
        'id': Number,
        'lecturer': Number,
        'tutor': Number,
        'core': Boolean,
        'student': Number,
        'rating': Number
      });
    },

    loadTestcases: function () {
      var self = this;
      // need to specially parse testcases, because they contain two different data structures
      return Q.when(this.loadFile(this.files.testcases))
        .then(function (data) {
          return self.parseTestcases(data);
        });
    },

    loadParse: function (url, Container, structure) {
      return Q.when(this.loadFile(url))
        .then(function (data) {
          return CSVParser.parse(data, Container, structure);
        });
    },

    parseTestcases: function (csv) {
      // split on the line starting with #course
      var dataArr = csv.split(/\n#course[a-zA-Z \t,]+\n/);

      var testcases = CSVParser.parse(dataArr[0], Testcase, Testcase.structure);
      var courseData = CSVParser.parse(dataArr[1], Course, {
        'id': Number,
        'lecturer': Number,
        'tutor': Number
      });

      return {testcases: testcases, courseData: courseData};
    },

    parseLine: function (line) {
      return CSVParser.parseLine(line, Student, Student.structure);
    }


  });

  return DataHandler;
});