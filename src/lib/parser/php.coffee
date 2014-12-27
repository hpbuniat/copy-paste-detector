_ = require "lodash"
util = require "util"
which = require "which"
AbstractParser = require "./abstract"
require 'shelljs/global'

module.exports.PHP = class ParsePHP extends AbstractParser

  varToken: null
  ignoreTokens: []

  constructor: () ->
    @weigth = 1
    @varToken = parseInt(exec("php -r \"echo T_VARIABLE;\"", {silent:true}).output)

    ignore = "T_INLINE_HTML,T_COMMENT,T_DOC_COMMENT,T_OPEN_TAG,T_OPEN_TAG_WITH_ECHO,T_CLOSE_TAG,T_WHITESPACE,T_USE,T_NS_SEPARATOR"
    getIgnore = util.format "php -r \"echo json_encode([%s]);\"", ignore
    @ignoreTokens = JSON.parse(exec(getIgnore, {silent:true}).output)

  parse:  (file, content, fuzzy) ->
    stack = []
    s = util.format "php -r \"echo json_encode(token_get_all(file_get_contents('%s')));\"", file
    tokens = JSON.parse(exec(s, {silent:true}).output)

    _.forEach tokens, (token) =>
      if _.isArray(token)
        if fuzzy && token[0] == @varToken
          token[1] = "__variable__"

        unless @ignores token[0]
          stack.push {
            type: token[0]
            value: token[1]
            line: token[2]
          }

    return stack

  ignores: (token) ->
    token in @ignoreTokens

  registers: (mime, extension) ->
    !!which.sync('php') && extension in ['php', 'php3', 'php4', 'php5']
