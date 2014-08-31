coffee = require "coffee-script"
_ = require "lodash"
path = require "path"
AbstractParser = require "./abstract"

module.exports.COFFEE = class ParseCoffee extends AbstractParser

  constructor: () ->
    @weigth = 1

  parse:  (file, content, fuzzy) ->
    stack = []
    tokens = coffee.tokens content
    _.forEach tokens, (token) =>
      unless @ignores token[0]
        stack.push {
          type: token[0]
          value: token[1]
          line: token[2].first_line
        }

    return stack

  ignores: (token) ->
    token in [
      'TERMINATOR'
      'INDENT'
    ]

  registers: (mime, extension) ->
    extension in ['coffee']