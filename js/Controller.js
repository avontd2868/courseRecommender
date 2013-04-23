define(['q',
  'DataHandler',
  'Recommender',
  'Testcase'], function (Q,DataHandler, Recommender , Testcase) {
  "use strict";

  function Main(environment) {
    Q.all([DataHandler.loadStudents(),
           DataHandler.loadRatedCourses(),
           DataHandler.loadTestcase()])
      .spread(function () {

        console.log('loaded all data', arguments);

        //var recommender = new Recommender();

        // automatically run testcases from file
       // Q.all([Testcase.getAll(), recommender]).spread(Testcase.assertAll);

        // run testcases when given from context (CLI/DOM)
        environment.on('submit:testcases', function (testcases) {

        });

        environment.on('submit:query', function (student) {

        });

        // let environment know that we're ready to handle input!
        environment.ready();
      },
      function error(err) {
        console.error(err);
      });
  }
  return Main;
});