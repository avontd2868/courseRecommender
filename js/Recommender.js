define(['underscore'], function (_) {

  /**
   * Construct a recommender system, and save pointers to courses and students

   * @constructor
   *
   */

  var Recommender = Class.extend({
    init: function (ratedCourses, students) {
      this.ratedCourses = ratedCourses;
      this.students = students;
    },

    setCourseData: function(courseData) {
      this.courseData = courseData;
    },
    /**
     * Course list 1:
     *   1. Find similar students
     *   2. get their high rated courses ratedCourses,
     *
     * Course list 2:
     *   1. Find new courses similar to the old courses already taken
     *
     * Merge lists!
     * Estimate ratings
     * Return top X(?) based on estimated ratings
     *
     * @param student
     * @returns {{rec1: number, rec2: number, rec3: number}}
     */
    getRecs: function (student) {
      var similarStudents = this.findSimilarStudents(student, 3);

      var highRatedCourses = this.getHighRatedCoursesFromStudents(similarStudents);

      var similarNewCourses = this.findNewSimilarCoursesFromStudent(student);

      //var similarNewCourses = this.findNewSimilarCoursesFromCourses(highRatedCourses);


      // average score for course 1
      // var avg = _.chain(ratings).where({course:1}).pluck('student_score').value().avg();

      var recs = this.getRandomRecs();

      return ;
    },

    /**
     *
     * @returns {}
     */
    getRandomRecs: function () {
      return _.shuffle(this.courseData);
    },

    findSimilarStudents: function (student, howmany) {
      // copy students array
      var students  = this.students.slice(0);

      var similarities = {};

      // cache similarities for sorting function
      _.each(students, function(s) {
        similarities[s.id] = student.getSimilarity(s);
      });

      // sort students based on their similarity
      students.sort(function(a, b) {
        return similarities[a.id] < similarities[b.id];
      });

      return students.length <= howmany ? students : students.slice(0, howmany);
    },

    getHighRatedCoursesFromStudents: function (students) {
      //console.log('students', students);

      // create hashmap of student ids for quick lookup when working with courses
      var studentIds = _.chain(students).pluck('id').invert().value();

      // work only with courses rated by the selected students
      var courses = _.filter(this.ratedCourses, function(rating) { return rating.student in studentIds; });

      // group ratings by course id
      var groups = _.groupBy(courses,'id');

      _.chain(groups).values().each(function(group) {
        var id = group[0].id;
        var avgRating = _.chain(group).pluck('rating').avg().value();

        groups[id] = avgRating;

      });
      console.log(groups)

      return groups;
    },

    findNewSimilarCoursesFromStudent: function(student) {
      var studentCourses = _.pick(student, 'course1', 'course2', 'course3', 'course4');
      console.log(studentCourses);

      // get courses


    },

    estimateCourseRatings: function (oldCourses, newCourses) {

    },
    getTopCourses: function (cutoff) {

    }
  });


  return Recommender;
});