(function() {
  var ReportJson, util, _;

  _ = require("lodash");

  util = require("util");

  module.exports = ReportJson = (function() {
    function ReportJson() {}

    ReportJson.prototype.report = function(clones, result) {
      var files, lines, num, res;
      num = clones.length;
      res = {};
      if (num) {
        files = {};
        lines = 0;
        _.forEach(clones, function(clone) {
          lines += clone.getSize() * (Object.keys(clone.getFiles()).length - 1);
          return _.forEach(clone.getFiles(), function(file) {
            return files[file.getName()] = {
              start: file.getStartLine(),
              end: file.getStartLine() + clone.getSize(),
              size: clone.getSize()
            };
          });
        });
        res.files = files;
        res.clonedLines = lines;
      }
      res.percentage = result.getPercentage();
      res.lines = result.getLines();
      res.clones = num;
      return JSON.stringify(res);
    };

    return ReportJson;

  })();

}).call(this);
