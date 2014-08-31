fs = require "fs"
path = require "path"
_ = require "lodash"
util = require "./util"
crc = require "crc"
crypto = require "crypto"
cloneContent = require "./clone/content"
cloneFile = require "./clone/file"
mime = require "mime"

module.exports = class Parser
  lng: {}
  hashes: {}

  constructor: ->
    _.extend @lng, util.util.requireDir "./parser/"
    _.forEach @lng, (parser, i) =>
      @lng[i] = new parser
      null

  parse: (result, file, tokens, lines, fuzzy) ->
    data = fs.readFileSync file
    result.addLines(data.toString().split("\n").length)
    try
      stack = @delegate(file, data.toString(), fuzzy)
      @analyze(result, file, stack, tokens, lines)
    catch err
      console.log err.toString().red
      console.log err.stack
      null

  delegate: (file, data, fuzzy) ->
    ext = (path.extname file).substr(1)
    parse = _.filter @lng, (parser) ->
      parser.registers(mime.lookup(file), ext)

    parse = _.sortBy(parse, 'weigth')
    if parse.length
      parse = _.last(parse)
    else
      parse = null

    throw new Error "filetype not handled: " + file unless parse?
    return parse.parse(file, data, fuzzy)

  analyze: (result, file, stack, tokens, lines) ->
    sig = ''
    tokenPos = []

    _.forEach stack, (token, i) ->
      sig += crc.crc8(token.type) + crc.crc32(token.value)
      tokenPos[i] = token.line
      null

    firstLine = firstHash = firstToken = i = 0
    f = false

    while (i <= (tokenPos.length - tokens))
      hash = crypto.createHash('md5').update(sig.substr(i * 10, tokens * 10)).digest('hex')
      if @hashes[hash]
        f = true
        if (firstLine == 0)
          firstLine = tokenPos[i]
          firstHash = hash
          firstToken = i
      else
        if (f)
          @addClone(result, file, tokenPos, lines, tokens, i, firstToken, firstLine, firstHash)
          f = false
          firstLine = 0

        @hashes[hash] = {
          file: file
          line: tokenPos[i]
        }

      i++

    if (f)
      @addClone(result, file, tokenPos, lines, tokens, i, firstToken, firstLine, firstHash)

    @

  addClone: (result, file, tokenPos, lines, tokens, i, firstToken, firstLine, firstHash) ->

    cloneStartFile = @hashes[firstHash].file
    cloneStartLine = @hashes[firstHash].line
    cloneEndToken = (parseInt(i) - 1) + parseInt(tokens) - 1
    cloneLines = parseInt(tokenPos[cloneEndToken]) + 1 - firstLine

    # handle lines which only contain ignored tokens
    # those lines should not be counted as duplicated line
    compareCloneLines = []
    for d in [firstToken..cloneEndToken]
      compareCloneLines.push tokenPos[d] if tokenPos[d]

    compareCloneLines = _.uniq(compareCloneLines).length

    if (compareCloneLines >= lines && (file != cloneStartFile || firstLine != cloneStartLine))
      result.addClone(
        new cloneContent(
          new cloneFile(cloneStartFile, cloneStartLine)
          new cloneFile(file, firstLine)
          cloneLines
          cloneEndToken + 1 - firstToken
        )
      )
    @
