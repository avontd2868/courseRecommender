define(['underscore', 'numeric'], function (_, N) {

  var Student = Class.extend({

    init: function Student(params) {

      _.extend(this, params);
    },

    /**
     * Calculate cosine similarity with other student
     * @param {Student} other
     */
    getSimilarity: function getSimilarity(other) {

      var getProps = function(student) {
        return _.chain(student).pick('undergrad', 'female', 'local', 'gpa').values().map(function(val) { return +val; }).value();
      };

      var getSqrtSum = function(vec) {
        return Math.sqrt(_.chain(vec).map(function(i) { return i*i }).sum().value());
      };

      var A = getProps(this);
      var B = getProps(other);

      var sum = N.dot(A, B);

      var Asq = getSqrtSum(A);
      var Bsq = getSqrtSum(B);

      var magnitude = Asq * Bsq;

      var similarity = magnitude > 0 ? sum/magnitude : -1;

      return similarity;
    }
  });

  Student.structure = {
      'id': Number,
      'undergrad': Boolean,
      'female': Boolean,
      'local': Boolean,
      'gpa': Number,
      'course1': Number,
      'course2': Number,
      'course3': Number,
      'course4': Number
  };

  return Student;
});