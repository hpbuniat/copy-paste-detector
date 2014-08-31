module.exports = class File

  id: ''
  name: ''
  startLine: 0

  constructor: (name, startLine) ->
    @name = name
    @startLine = startLine
    @id = name + ':' + startLine

  getId: () ->
    @id

  getName: () ->
    @name

  getStartLine: () ->
    @startLine
