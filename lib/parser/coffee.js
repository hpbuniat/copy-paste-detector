(function() {
  var AbstractParser, ParseCoffee, coffee, path, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  coffee = require("coffee-script");

  _ = require("lodash");

  path = require("path");

  AbstractParser = require("./abstract");

  module.exports.COFFEE = ParseCoffee = (function(_super) {
    __extends(ParseCoffee, _super);

    function ParseCoffee() {
      this.weigth = 1;
    }

    ParseCoffee.prototype.parse = function(file, content, fuzzy) {
      var stack, tokens;
      stack = [];
      tokens = coffee.tokens(content);
      _.forEach(tokens, (function(_this) {
        return function(token) {
          if (!_this.ignores(token[0])) {
            return stack.push({
              type: token[0],
              value: token[1],
              line: token[2].first_line
            });
          }
        };
      })(this));
      return stack;
    };

    ParseCoffee.prototype.ignores = function(token) {
      return token === 'TERMINATOR' || token === 'INDENT';
    };

    ParseCoffee.prototype.registers = function(mime, extension) {
      return extension === 'coffee';
    };

    return ParseCoffee;

  })(AbstractParser);

}).call(this);
