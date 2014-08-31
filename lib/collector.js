(function() {
  var Collector, fs, minimatch, path, wrench, _;

  wrench = require("wrench");

  minimatch = require("minimatch");

  _ = require("lodash");

  path = require("path");

  fs = require("fs");

  module.exports = Collector = (function() {
    function Collector() {}

    Collector.prototype.collect = function(directory, depth, include, exclude) {
      var excludes, files, includes;
      files = wrench.readdirSyncRecursive(directory);
      if (!include) {
        include = ".";
      }
      if (!exclude) {
        exclude = "";
      }
      includes = include.split(",").trim();
      excludes = _.filter(exclude.split(",").trim(), function(item) {
        return !!item.length;
      });
      _.forEach(files, function(item, i) {
        return files[i] = path.normalize(directory + path.sep + item);
      });
      files = _.filter(files, function(item, i) {
        var d, e, f, o, relDepth, _i, _j, _len, _len1;
        relDepth = path.normalize(directory + path.sep).count(path.sep);
        i = false;
        e = false;
        f = fs.lstatSync(item).isFile();
        o = {
          dot: true,
          nocase: true,
          matchBase: true
        };
        for (d = _i = 0, _len = includes.length; _i < _len; d = ++_i) {
          include = includes[d];
          i = minimatch(item, include, o);
          if (i) {
            break;
          }
        }
        for (d = _j = 0, _len1 = excludes.length; _j < _len1; d = ++_j) {
          exclude = excludes[d];
          if (exclude.indexOf('*') === -1) {
            e = !!item.match(new RegExp(exclude));
            if (e) {
              break;
            }
          } else {
            e = minimatch(item, exclude, o);
            if (e) {
              break;
            }
          }
        }
        if (depth && i) {
          i = item.count(path.sep) - relDepth <= depth - 1;
        }
        return f && i && !e;
      });
      return files;
    };

    return Collector;

  })();

}).call(this);
