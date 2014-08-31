(function() {
  var AbstractParser, ParseCSS, css, path, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  css = require("css");

  _ = require("lodash");

  path = require("path");

  AbstractParser = require("./abstract");

  module.exports.CSS = ParseCSS = (function(_super) {
    __extends(ParseCSS, _super);

    ParseCSS.prototype.stack = [];

    function ParseCSS() {
      this.weigth = 1;
    }

    ParseCSS.prototype.parse = function(file, content, fuzzy) {
      var ast;
      this.stack = [];
      ast = css.parse(content, {
        source: file,
        silent: true
      });
      this.recursiveRuleParser(ast.stylesheet.rules, "", fuzzy);
      return this.stack;
    };

    ParseCSS.prototype.recursiveRuleParser = function(rules, scope, fuzzy) {
      _.forEach(rules, (function(_this) {
        return function(rule) {
          if (rule.rules != null) {
            return _this.recursiveRuleParser(rule.rules, rule.type + " ", fuzzy);
          } else if (rule.type === "rule") {
            if (!fuzzy) {
              _.forEach(rule.selectors, function(selector) {
                return _this.stack.push({
                  type: scope + "selector",
                  value: selector,
                  line: rule.position.start.line
                });
              });
            }
            return _.forEach(rule.declarations, function(declaration) {
              _this.stack.push({
                type: "property",
                value: scope + declaration.property,
                line: declaration.position.start.line
              });
              return _this.stack.push({
                type: "value",
                value: declaration.value,
                line: declaration.position.start.line
              });
            });
          }
        };
      })(this));
      return this;
    };

    ParseCSS.prototype.ignores = function(token) {
      return false;
    };

    ParseCSS.prototype.registers = function(mime, extension) {
      return mime === "text/css" || (extension === 'css');
    };

    return ParseCSS;

  })(AbstractParser);

}).call(this);
