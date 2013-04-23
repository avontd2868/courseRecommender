define(['underscore', 'Student', 'Course'], function (_, Student, Course) {

  var Testcase = Class.extend({

    init: function (params) {

      _.extend(this, params);
    },

    getStudent: function () {
      var params = {};
      for (var property in Student.structure) {
        params[property] = this[property];
      }
      return new Student(params);
    },

    getRecs: function () {
      return [this.rec1, this.rec2, this.rec3];
    },

    /**
     * Assert if the testcase is correct
     * @param recommender
     * @returns {{testcase: *, pass: boolean, trecs: *, recs: (*|{rec1: number, rec2: number, rec3: number})}}
     */
    assert: function(recommender) {
      var trecs = this.getRecs();
      var recs = recommender.getRecs(this.getStudent());

      var pass = true;
      for (var rec = 0, l = trecs.length; rec < l; rec++) {
        if (trecs[rec] !== recs[rec]) {
          pass = false;
        }
      }
      // create and return result object
      return {testcase: this, pass: pass, trecs: trecs, recs: recs};
    }

  });

  // #Std No,undergrad,female,local,gpa,Course,Course,Course,Course,Recommendation 1,Rec 2,Rec 3
  Testcase.structure = {
    'id': Number,
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
  };

  Testcase.assertAll = function (testcases, recommender) {
    // assert
    var results = _.map(testcases, function(testcase) {
      testcase.assert(recommender);
    });
    return results;
  };

  return Testcase;
});