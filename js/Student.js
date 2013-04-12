define(['CSVHandler'], function(CSVHandler) {

	function Student() {
		
	}

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
	}

	Student.getAll = function(callback) {
		return CSVHandler.loadParse(Student, 'data/student.csv', callback);
	}

	return Student;
});