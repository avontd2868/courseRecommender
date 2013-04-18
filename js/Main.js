define(['Utility',
  'q',
  'Student',
  'Course',
  'Testcase',
  'Recommender'], function (Utility, Q, Student, Course, Testcase, Recommender) {
  "use strict";

  function Main(global, environment) {

    // attach utility methods to global object
    Utility(global);
    global._context = environment;

    Q.all([Course.getOldCourses(),
          Course.getNewCourses(),
        Student.getAll()])
      .spread(function (oldCourses, newCourses, students) {

       var recommender = new Recommender(oldCourses, newCourses, students);

        // automatically run testcases from file
        Q.all([Testcase.getAll(), recommender]).spread(Testcase.assertAll);

        // run testcases when given from context
        environment.on('submit:testcases', function(testcases) {

        });

        environment.on('submit:studentquery', function(student) {

        });

      },
      function error(err) {
        console.error(err);
      });
  }

  return Main;
});