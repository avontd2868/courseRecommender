define(['underscore'], function (_) {

  /**
   * A Course object
   * @constructor
   */

  var Course = Class.extend({
    init:function(params) {
      _.extend(this, params);
    },

    /**
     * binary: course, lecturer, tutor
     *
     * @param course
     * @returns {number}
     */
    getSimilarity: function (course) {

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
  });

  return Course;
});