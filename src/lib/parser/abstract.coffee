module.exports = class AbstractParser

  weigth: 0

  ignores: (token) ->
    false

  registers: (mime, extension) ->
    false