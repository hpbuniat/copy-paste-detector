_ = require "lodash"
AbstractParser = require "./abstract"

module.exports.Generic = class ParseGeneric extends AbstractParser

  constructor: () ->
    @weigth = 0

  parse:  (file, content, fuzzy) ->
    stack = []
    lines = content.split("\n")
    _.forEach lines, (line, i) =>
      tokens = line.trim().split(" ")
      for token, d in tokens
        unless @ignores token
          stack.push {
            type: "generic"
            value: token
            line: i + 1
          }

    return stack

  ignores: (token) ->
    return token.match(/^\s+$/)

  registers: (mime, extension) ->
    true