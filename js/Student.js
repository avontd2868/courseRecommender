define(['underscore', 'CSVHandler'], function(_, CSVHandler) {

	function Student(params) {
    _.extend(this, params);
	}

  Student.collection = [];

  Student.structure = {
    'student': Number,
    'undergrad': Boolean,
    'female': Boolean,
    'local': Boolean,
    'gpa': Number,
    'course1': Number,
    'course2': Number,
    'course3': Number,
    'course4': Number
  };

	Student.getAll = function getAll() {
		return CSVHandler.loadParse(Student, Student.structure, 'data/student.csv');
	};

  /**
   * binary: undergrad, female, local
   * numeric: gpa
   */
	Student.prototype.getSimilarity = function getSimilarity() {

		var properties = _.pluck([this], 'undergrad', 'female', 'local')

		// Binary: undergrad, female, local
		// Cosine value: gpa

	};

	return Student;
});