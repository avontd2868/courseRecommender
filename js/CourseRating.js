define(['CSVHandler'], function(CSVHandler) {

	// #course,lecturer,tutor,core,student,student_score
	// 1,1,1,1,1,2
	
	function CourseRating() {
	}

	CourseRating.structure = {
		'course': Number,
		'lecturer': Number,
		'tutor': Number,
		'core': Boolean,
		'student': Number,
		'student_score': Number
	}

	CourseRating.getAll = function(callback) {
		return CSVHandler.loadParse(CourseRating, 'data/course.csv', callback);
	}

	return CourseRating;

});