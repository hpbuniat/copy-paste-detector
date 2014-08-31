crypto = require "crypto"
fs = require "fs"

module.exports = class Content

  size: 0
  tokens: 0
  files: {}
  id: ''
  lines: ''

  constructor: (firstFile, nextFile, size, tokens) ->
    @files = {}
    @size = size
    @tokens = tokens

    @addFile firstFile
    @addFile nextFile
    @id = crypto.createHash('md5').update(@getLines()).digest('hex')

  addFile: (file) ->
    id = file.getId()
    @files[id] = file unless @files[id]?
    @

  getId: ->
    @id

  getSize: ->
    @size

  getTokens: ->
    @tokens

  getFiles: ->
    @files

  getLines: ->
    unless @lines
      file = @files[Object.keys(@files)[0]]
      data = (fs.readFileSync file.getName()).toString().split("\n")
      lines = data.slice(file.getStartLine() - 1, file.getStartLine() - 1 + @getSize())
      @lines = lines.join('')

    @lines
