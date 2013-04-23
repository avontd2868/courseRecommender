define(['q',
  'Recommender',
  'Testcase'], function (Q, Recommender, Testcase) {
  "use strict";

  Q.onerror = function(err) {
    console.error(err);
  }

  var Controller = Class.extend({
    init: function (environment) {


      Q.all([
          environment.loadRatedCourses(),
          environment.loadStudents()])
        .spread(function (ratedCourses, students) {

          //console.log('loaded ratedCourses, students', ratedCourses, students);

          var recommender = new Recommender(ratedCourses, students);
          // load testcases from file
          Q.when(environment.loadTestcases()).then(function (tc) {
            recommender.setCourseData(tc.courseData);

            // assert all
            //var results = Testcase.assertAll(tc.testcases, recommender);

            // assert one
            var results = [tc.testcases[0].assert(recommender)];

            environment.displayBatchResults(results);
          });


          // run testcases when given from context (CLI/DOM)
          environment.on('submit:batch', function (tc) {
            recommender.setCourseData(tc.courseData);
            var results = Testcase.assertAll(tc.testcases, recommender);
            environment.displayBatchResults(results);
          });

          // run query given from context (CLI/DOM)
          environment.on('submit:query', function (student) {
            var recs = recommender.getRecs(student);
            environment.displayQueryResults(recs);
          });

        });
    }
  });

  return Controller;
});