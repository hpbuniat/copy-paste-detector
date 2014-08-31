(function() {
  var Content, crypto, fs;

  crypto = require("crypto");

  fs = require("fs");

  module.exports = Content = (function() {
    Content.prototype.size = 0;

    Content.prototype.tokens = 0;

    Content.prototype.files = {};

    Content.prototype.id = '';

    Content.prototype.lines = '';

    function Content(firstFile, nextFile, size, tokens) {
      this.files = {};
      this.size = size;
      this.tokens = tokens;
      this.addFile(firstFile);
      this.addFile(nextFile);
      this.id = crypto.createHash('md5').update(this.getLines()).digest('hex');
    }

    Content.prototype.addFile = function(file) {
      var id;
      id = file.getId();
      if (this.files[id] == null) {
        this.files[id] = file;
      }
      return this;
    };

    Content.prototype.getId = function() {
      return this.id;
    };

    Content.prototype.getSize = function() {
      return this.size;
    };

    Content.prototype.getTokens = function() {
      return this.tokens;
    };

    Content.prototype.getFiles = function() {
      return this.files;
    };

    Content.prototype.getLines = function() {
      var data, file, lines;
      if (!this.lines) {
        file = this.files[Object.keys(this.files)[0]];
        data = (fs.readFileSync(file.getName())).toString().split("\n");
        lines = data.slice(file.getStartLine() - 1, file.getStartLine() - 1 + this.getSize());
        this.lines = lines.join('');
      }
      return this.lines;
    };

    return Content;

  })();

}).call(this);
