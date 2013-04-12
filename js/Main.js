define(['Student',
        'CourseRating',
        'TestCase',
        'DOM',
        'domReady'], function(Student, CourseRating, TestCase, DOM) {
  "use strict";

  $.when(
    CourseRating.getAll(),
    Student.getAll(),
    TestCase.getAll())
    .then(function(ratings, students, testCases) {

      // avg score for course 1
      var avg = _.where(ratings, {course:1}).map(function(rating) {return rating.student_score}).avg();

    // assert
    testCases.forEach(function(testCase) {

      var testRecs = testCase.getRecs();

      var recs = getRecs(testCase.getStudent());

      for(var rec in testRecs) {
        console.assert(testRecs[rec] === recs[rec]);
      }

    });


    function getRecs(student) {


      return {rec1: 1, rec2: 2, rec3: 3};
    }

    DOM.on('submit:testcases', function(testcases) {
      console.log('testcases', testcases);
    });

    DOM.on('submit:student', function(student) {
      // show recommendations for this student
      console.log('student', student);
    });

  });
});