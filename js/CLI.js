define(['Student',
  'Testcase',
  'fs',
  'asEvented'], function (Student, Testcase, FS, asEvented) {

  function CLI() {



  }

  asEvented.call(CLI.prototype);

  var student = new Student({

  });

  CLI.prototype.getTestcases = function() {
    return Testcase.getAll();
  };

  CLI.prototype.loadFile = function(location) {
    return Q.nfcall(FS.readFile, process.cwd()+'/'+location, "utf-8");
  };

  CLI.prototype.getStudentQuery = function() {

  };

  return new CLI();
});