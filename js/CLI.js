define([
  'fs',
  'asEvented',
  'q',
  'commander',
  'Controller',
  'DataHandler',
  'Student',
  'Testcase'
], function (FS, asEvented, Q, Command, Controller, DataHandler, Student, Testcase) {

  var CLI = DataHandler.extend({
    files: {},

    init: function () {

      new Controller(this);

      Command.version('1.0.0')
        .usage('[options] undergrad?,female?,local?,gpa?,course1?,course2?,course3?,course4?')
        .option('-c, --courses', 'Path to courses csv file')
        .option('-s, --students', 'Path to students csv file')
        .option('-t, --testcases', 'Path to testcases csv file')
        .parse(process.argv);

      Command.on('--help', function(){
        console.log('  Examples:');
        console.log('');
        console.log('    $ custom-help --help');
        console.log('    $ custom-help -h');
        console.log('');
      });

      this.files = {
        'ratedCourses': Command.courses || 'data/course.csv',
          'students': Command.students || 'data/student.csv',
          'testcases': Command.testcases || 'data/test.csv'
      };
      this.query = Command.args;

      this.loadTestcases();

      this.trigger('submit:query', this.parseLine(this.query, Student, Student.structure));
    },

    loadFile: function (location) {
      return Q.nfcall(FS.readFile, process.cwd() + '/' + location, "utf-8");
    }
  });

  asEvented.call(CLI.prototype);

  return CLI;
});