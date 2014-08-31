css = require "css"
_ = require "lodash"
path = require "path"
AbstractParser = require "./abstract"

module.exports.CSS = class ParseCSS extends AbstractParser

  stack: []

  constructor: () ->
    @weigth = 1

  parse:  (file, content, fuzzy) ->
    @stack = []
    ast = css.parse(content, {
      source: file
      silent: true
    })

    @recursiveRuleParser ast.stylesheet.rules, "", fuzzy
    return @stack

  recursiveRuleParser: (rules, scope, fuzzy) ->
    _.forEach rules, (rule) =>
      if rule.rules?
        @recursiveRuleParser rule.rules, rule.type + " ", fuzzy
      else if rule.type == "rule"
        unless fuzzy
          _.forEach rule.selectors, (selector) =>
            @stack.push {
              type: scope + "selector"
              value: selector
              line: rule.position.start.line
            }

        _.forEach rule.declarations, (declaration) =>
          @stack.push {
            type: "property"
            value: scope + declaration.property
            line: declaration.position.start.line
          }

          @stack.push {
            type: "value"
            value: declaration.value
            line: declaration.position.start.line
          }
    @

  ignores: (token) ->
    false

  registers: (mime, extension) ->
    mime == "text/css" || extension in ['css']