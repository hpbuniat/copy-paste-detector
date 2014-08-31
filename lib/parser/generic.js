(function() {
  var AbstractParser, ParseGeneric, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require("lodash");

  AbstractParser = require("./abstract");

  module.exports.Generic = ParseGeneric = (function(_super) {
    __extends(ParseGeneric, _super);

    function ParseGeneric() {
      this.weigth = 0;
    }

    ParseGeneric.prototype.parse = function(file, content, fuzzy) {
      var lines, stack;
      stack = [];
      lines = content.split("\n");
      _.forEach(lines, (function(_this) {
        return function(line, i) {
          var d, token, tokens, _i, _len, _results;
          tokens = line.trim().split(" ");
          _results = [];
          for (d = _i = 0, _len = tokens.length; _i < _len; d = ++_i) {
            token = tokens[d];
            if (!_this.ignores(token)) {
              _results.push(stack.push({
                type: "generic",
                value: token,
                line: i + 1
              }));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };
      })(this));
      return stack;
    };

    ParseGeneric.prototype.ignores = function(token) {
      return token.match(/^\s+$/);
    };

    ParseGeneric.prototype.registers = function(mime, extension) {
      return true;
    };

    return ParseGeneric;

  })(AbstractParser);

}).call(this);
