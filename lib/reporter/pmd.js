(function() {
  var ReportPMD, builder, util, _;

  _ = require("lodash");

  util = require("util");

  builder = require("xmlbuilder");

  module.exports = ReportPMD = (function() {
    function ReportPMD() {}

    ReportPMD.prototype.report = function(clones, result) {
      var num, xml;
      num = clones.length;
      xml = builder.create('pmd-cpd');
      if (num) {
        _.forEach(clones, function(clone) {
          var duplication;
          duplication = xml.ele('duplication', {
            lines: clone.getSize(),
            tokens: clone.getTokens()
          });
          duplication.ele('codefragment', clone.getLines());
          return _.forEach(clone.getFiles(), function(file) {
            return file = duplication.ele('file', {
              path: file.getName(),
              line: file.getStartLine()
            });
          });
        });
      }
      return xml.end({
        pretty: true
      });
    };

    return ReportPMD;

  })();

}).call(this);
