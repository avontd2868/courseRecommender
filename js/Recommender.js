define(['underscore'], function(_) {

  /**
   * Construct a recommender system, and save pointers to courses and students
   * @param ratings
   * @param students
   * @constructor
   */
  function Recommender(ratings, students) {
    this.ratings = ratings;
    this.students = students;

    _.bindAll(this);
  }

  /**
   * Course list 1:
   *   1. Find similar students
   *   2. get their high rated courses,
   *   3. based on those courses, estimate ratings of new courses
   *
   * Course list 2:
   *   1. Find new courses similar to the courses already taken
   *   2. estimate ratings
   *
   * Merge lists, return top 3(?) based on estimated ratings
   *
   * @param student
   * @returns {{rec1: number, rec2: number, rec3: number}}
   */
  Recommender.prototype.getRecs = function(student) {

    // get top3 most similar students
    var top3 = _.chain(this.students).map(function(s) {
      return student.getSimilarity(s);
    }).sort().slice(0,3);


    console.log(student);



    // average score for course 1
    // var avg = _.chain(ratings).where({course:1}).pluck('student_score').value().avg();


    return {rec1: 1, rec2: 2, rec3: 3};
  }

  Recommender.prototype.findSimilarStudents = function(student) {

  };

  Recommender.prototype.getHighRatedCoursesFromStudents = function(students) {

  };

  Recommender.prototype.estimateCourseRatings = function(oldCourses, newCourses) {

  };

  Recommender.prototype.getTopCourses = function(cutoff) {

  };

  return Recommender;
});