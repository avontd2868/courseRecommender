define(['underscore', 'q', 'CSVHandler'], function (_, Q, CSVHandler) {

  /**
   * A Course object consist of multiple editions
   * @constructor
   */
  function Course(params) {
    if (typeof params === "number") {
      if (!(params in Course.collection)) {
        var course = new Course();
        course._id = params;
        Course.collection[params] = course;
      }
      return Course.collection[params];
    }

    _.extend(this, params);

  }

  Course.collection = {};

  Course.getOldCourses = function () {
    return CSVHandler.loadParse(Course, {
      '_id': Number,
      'lecturer': Number,
      'tutor': Number,
      'core': Boolean,
      'student': Number,
      'student_score': Number
    }, 'data/course.csv');
  };

  Course.getNewCourses = function () {
    return CSVHandler.loadParse(Course, {
      '_id': Number,
      'lecturer': Number,
      'tutor': Number
    }, 'data/course-next.csv');
  };

  Course.getAll = function() {
    return Q.when(Course.getOldCourses(), Course.getNewCourses())
      .then(function(history,future) {
        return {history: history, future:future};
    });
  }

  /**
   * binary: course, lecturer, tutor
   *
   * @param course
   * @returns {number}
   */
  Course.prototype.getSimilarity = function (course) {

    if (!(course instanceof this.constructor)) {
      throw new TypeError('Illegal parameter.')
    }
    if (course === this) {
      throw new Error('Can not compare a course to itself.')
    }

    var numerator = v1.dot(v2);
    var denominator = v1.length * v2.length;

    console.log(numerator / denominator);

    // get structure properties, but exclude 'course'

    // initialize similarity integer
    var similarity = 0;
  }

  return Course;

});