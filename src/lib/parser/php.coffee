_ = require "lodash"
execSync = require "exec-sync"
util = require "util"
AbstractParser = require "./abstract"

module.exports.PHP = class ParsePHP extends AbstractParser

  constructor: () ->
    @weigth = 1

  parse:  (file, content, fuzzy) ->
    stack = []
    s = util.format "php -r \"echo json_encode(token_get_all(file_get_contents('%s')));\"", file
    tokens = JSON.parse execSync s

    _.forEach tokens, (token) =>
      if _.isArray(token)
        if fuzzy && token[0] == 310
          token[1] = "__variable__"

        unless @ignores token[0]
          stack.push {
            type: token[0]
            value: token[1]
            line: token[2]
          }

    return stack

  ignores: (token) ->
    token in [
      312 # T_INLINE_HTML
      372 # T_COMMENT
      373 # T_DOC_COMMENT
      374 # T_OPEN_TAG
      375 # T_OPEN_TAG_WITH_ECHO
      376 # T_CLOSE_TAG
      377 # T_WHITESPACE
      342 # T_USE
      386 # T_NS_SEPARATOR
    ]

  registers: (mime, extension) ->
    extension in ['php', 'php3', 'php4', 'php5']