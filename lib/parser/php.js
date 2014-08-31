(function() {
  var AbstractParser, ParsePHP, execSync, util, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require("lodash");

  execSync = require("exec-sync");

  util = require("util");

  AbstractParser = require("./abstract");

  module.exports.PHP = ParsePHP = (function(_super) {
    __extends(ParsePHP, _super);

    function ParsePHP() {
      this.weigth = 1;
    }

    ParsePHP.prototype.parse = function(file, content, fuzzy) {
      var s, stack, tokens;
      stack = [];
      s = util.format("php -r \"echo json_encode(token_get_all(file_get_contents('%s')));\"", file);
      tokens = JSON.parse(execSync(s));
      _.forEach(tokens, (function(_this) {
        return function(token) {
          if (_.isArray(token)) {
            if (fuzzy && token[0] === 310) {
              token[1] = "__variable__";
            }
            if (!_this.ignores(token[0])) {
              return stack.push({
                type: token[0],
                value: token[1],
                line: token[2]
              });
            }
          }
        };
      })(this));
      return stack;
    };

    ParsePHP.prototype.ignores = function(token) {
      return token === 312 || token === 372 || token === 373 || token === 374 || token === 375 || token === 376 || token === 377 || token === 342 || token === 386;
    };

    ParsePHP.prototype.registers = function(mime, extension) {
      return extension === 'php' || extension === 'php3' || extension === 'php4' || extension === 'php5';
    };

    return ParsePHP;

  })(AbstractParser);

}).call(this);
