define(['CSVHandler', 'Student'], function(CSVHandler, Student) {

// #Std No,undergrad,female,local,gpa,Course,Course,Course,Course,Recommendation 1,Rec 2,Rec 3
// 11,1,1,1,3,1,2,,,5,6,3

	function TestCase() {
		
	}

	TestCase.structure = {
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

  TestCase.prototype.getStudent = function() {
    var student = new Student();
    for(var property in Student.structure) {
      student[property] = this[property];
    }
    return student;
  }

  TestCase.prototype.getRecs = function() {
    return {
      rec1: this.rec1,
      rec2: this.rec2,
      rec3: this.rec3
    };
  };

	TestCase.getAll = function(callback) {
		return CSVHandler.loadParse(TestCase, 'data/test.csv', callback);
	}

  TestCase.fromCSV = function(data) {
    return CSVHandler.parse(TestCase, data);
  }

	return TestCase;
});