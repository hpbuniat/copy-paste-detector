(function() {
  var File;

  module.exports = File = (function() {
    File.prototype.id = '';

    File.prototype.name = '';

    File.prototype.startLine = 0;

    function File(name, startLine) {
      this.name = name;
      this.startLine = startLine;
      this.id = name + ':' + startLine;
    }

    File.prototype.getId = function() {
      return this.id;
    };

    File.prototype.getName = function() {
      return this.name;
    };

    File.prototype.getStartLine = function() {
      return this.startLine;
    };

    return File;

  })();

}).call(this);
