(function() {
  var util;

  if (!String.prototype.trim) {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, "");
    };
  }

  if (!String.prototype.count) {
    String.prototype.count = function(search) {
      var m, r;
      m = this.match(new RegExp(search.toString().replace(/(?=[.\\+*?[^\]$(){}\|])/g, "\\"), "g"));
      r = 0;
      if (m) {
        r = parseInt(m.length);
      }
      return r;
    };
  }

  if (!Array.prototype.trim) {
    Array.prototype.trim = function() {
      var d, i, _i, _len, _results;
      _results = [];
      for (i = _i = 0, _len = this.length; _i < _len; i = ++_i) {
        d = this[i];
        _results.push(d.trim());
      }
      return _results;
    };
  }

  util = {
    requireDir: function(dir) {
      var filename, path, r, _;
      path = require("path");
      _ = require("lodash");
      r = {};
      filename = module.filename;
      if (!filename) {
        filename = module.__filename;
      }
      require("fs").readdirSync(path.normalize(path.dirname(filename) + "/" + dir)).forEach(function(file) {
        if (file.indexOf("abstract") === -1) {
          return _.extend(r, require(dir + file));
        }
      });
      return r;
    }
  };

  exports.util = util;

}).call(this);
