esprima = require "esprima"
_ = require "lodash"
AbstractParser = require "./abstract"

module.exports.JS = class ParseJS extends AbstractParser

  constructor: () ->
    @weigth = 1

  parse:  (file, content, fuzzy) ->
    stack = []

    _.forEach esprima.tokenize(content, {
      loc: true
    }), (data) =>
      if fuzzy && data.type == "Identifier"
        data.value = "__variable__"

      unless @ignores data.type
        stack.push {
          type: data.type
          value: data.value
          line: data.loc.start.line
        }

    return stack

  ignores: (token) ->
    false

  registers: (mime, extension) ->
    mime == "application/javascript" || extension in ['js', 'javascript']