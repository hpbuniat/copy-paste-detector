(function() {
  var ReportText, util, _;

  _ = require("lodash");

  util = require("util");

  module.exports = ReportText = (function() {
    function ReportText() {}

    ReportText.prototype.report = function(clones, result) {
      var files, lines, num, r, str;
      num = clones.length;
      str = r = "";
      if (num) {
        files = {};
        lines = 0;
        _.forEach(clones, function(clone) {
          lines += clone.getSize() * (Object.keys(clone.getFiles()).length - 1);
          str += "\n  -";
          return _.forEach(clone.getFiles(), function(file) {
            str += util.format("\t%s:%d-%d\n", file.getName(), file.getStartLine(), file.getStartLine() + clone.getSize());
            return files[file.getName()] = file;
          });
        });
        r += util.format("Found %d exact clones with %d duplicated lines in %d files:\n%s", num, lines, Object.keys(files).length, str);
      }
      r += util.format("%s%% duplicated lines out of %d total lines of code.\n", result.getPercentage(), result.getLines());
      return r;
    };

    return ReportText;

  })();

}).call(this);
