(function() {
  var AbstractParser, ParseJS, esprima, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  esprima = require("esprima");

  _ = require("lodash");

  AbstractParser = require("./abstract");

  module.exports.JS = ParseJS = (function(_super) {
    __extends(ParseJS, _super);

    function ParseJS() {
      this.weigth = 1;
    }

    ParseJS.prototype.parse = function(file, content, fuzzy) {
      var stack;
      stack = [];
      _.forEach(esprima.tokenize(content, {
        loc: true
      }), (function(_this) {
        return function(data) {
          if (fuzzy && data.type === "Identifier") {
            data.value = "__variable__";
          }
          if (!_this.ignores(data.type)) {
            return stack.push({
              type: data.type,
              value: data.value,
              line: data.loc.start.line
            });
          }
        };
      })(this));
      return stack;
    };

    ParseJS.prototype.ignores = function(token) {
      return false;
    };

    ParseJS.prototype.registers = function(mime, extension) {
      return mime === "application/javascript" || (extension === 'js' || extension === 'javascript');
    };

    return ParseJS;

  })(AbstractParser);

}).call(this);
