define(['underscore', 'CSVHandler', 'Student', 'Course'], function(_, CSVHandler, Student, Course) {

	function Testcase(params) {

    _.extend(this, params);
	}


  // #Std No,undergrad,female,local,gpa,Course,Course,Course,Course,Recommendation 1,Rec 2,Rec 3
  Testcase.structure = {
			'student': Number,
			'undergrad': Boolean,
			'female': Boolean,
			'local': Boolean,
			'gpa': Number,
			'course1': Number,
			'course2': Number,
			'course3': Number,
			'course4': Number,
			'rec1': Number,
			'rec2': Number,
			'rec3': Number
	}

  Testcase.prototype.getStudent = function() {
    var params = {};
    for(var property in Student.structure) {
      params[property] = this[property];
    }
    return new Student(params);
  };

  Testcase.prototype.getRecs = function() {
    return [this.rec1, this.rec2, this.rec3];
  };

	Testcase.getAll = function() {
		return CSVHandler.loadParse(Testcase, Testcase.structure, 'data/test.csv');
	};

  Testcase.fromCSV = function(data) {
    return CSVHandler.parse(Testcase, Testcase.structure, data);
  };

  Testcase.assertAll = function(testcases, recommender) {


    // assert
    testcases.forEach(function (testcase) {
      var pass = true;
      var testRecs = testcase.getRecs();

      var recs = recommender.getRecs(testcase.getStudent());

      for (var rec in testRecs) {
        if (testRecs[rec] !== recs[rec]) {
          pass = false;
        }
      }
      console.assert(pass, "Incorrect recommendation");

    });
  };

	return Testcase;
});