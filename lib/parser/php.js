(function() {
  var AbstractParser, ParsePHP, util, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ = require("lodash");

  util = require("util");

  AbstractParser = require("./abstract");

  require('shelljs/global');

  module.exports.PHP = ParsePHP = (function(_super) {
    __extends(ParsePHP, _super);

    ParsePHP.prototype.varToken = null;

    ParsePHP.prototype.ignoreTokens = [];

    function ParsePHP() {
      var getIgnore, ignore;
      this.weigth = 1;
      this.varToken = parseInt(exec("php -r \"echo T_VARIABLE;\"", {
        silent: true
      }).output);
      ignore = "T_INLINE_HTML,T_COMMENT,T_DOC_COMMENT,T_OPEN_TAG,T_OPEN_TAG_WITH_ECHO,T_CLOSE_TAG,T_WHITESPACE,T_USE,T_NS_SEPARATOR";
      getIgnore = util.format("php -r \"echo json_encode([%s]);\"", ignore);
      this.ignoreTokens = JSON.parse(exec(getIgnore, {
        silent: true
      }).output);
    }

    ParsePHP.prototype.parse = function(file, content, fuzzy) {
      var s, stack, tokens;
      stack = [];
      s = util.format("php -r \"echo json_encode(token_get_all(file_get_contents('%s')));\"", file);
      tokens = JSON.parse(exec(s, {
        silent: true
      }).output);
      _.forEach(tokens, (function(_this) {
        return function(token) {
          if (_.isArray(token)) {
            if (fuzzy && token[0] === _this.varToken) {
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
      return __indexOf.call(this.ignoreTokens, token) >= 0;
    };

    ParsePHP.prototype.registers = function(mime, extension) {
      return extension === 'php' || extension === 'php3' || extension === 'php4' || extension === 'php5';
    };

    return ParsePHP;

  })(AbstractParser);

}).call(this);
