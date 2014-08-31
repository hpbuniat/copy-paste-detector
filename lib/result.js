(function() {
  var Result, _;

  _ = require("lodash");

  module.exports = Result = (function() {
    function Result() {}

    Result.prototype.lines = 0;

    Result.prototype.clones = [];

    Result.prototype.cloneMap = {};

    Result.prototype.reset = function() {
      this.lines = 0;
      this.clones = [];
      this.cloneMap = {};
      return this;
    };

    Result.prototype.addLines = function(lines) {
      this.lines += lines;
      return this;
    };

    Result.prototype.getLines = function() {
      return this.lines;
    };

    Result.prototype.addClone = function(clone) {
      var id, origClone;
      this.clones.push(clone);
      id = clone.getId();
      if (this.cloneMap[id] != null) {
        origClone = this.cloneMap[id];
        _.forEach(clone.getFiles(), function(file) {
          return origClone.addFile(file);
        });
      } else {
        this.cloneMap[id] = clone;
      }
      return this;
    };

    Result.prototype.getClones = function() {
      return this.clones;
    };

    Result.prototype.getCloneMap = function() {
      return this.cloneMap;
    };

    Result.prototype.getPercentage = function() {
      var lines, str;
      lines = 0;
      _.forEach(this.clones, function(clone) {
        return lines += clone.getSize();
      });
      str = 0;
      if (this.lines) {
        str = (lines / this.lines).toFixed(2);
      }
      return str;
    };

    return Result;

  })();

}).call(this);
