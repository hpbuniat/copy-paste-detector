_ = require "lodash"
util = require "util"
builder = require "xmlbuilder"

module.exports = class ReportPMD
  report: (clones, result) ->
    num = clones.length
    xml = builder.create('pmd-cpd')
    if num
      _.forEach clones, (clone) ->
        duplication = xml.ele('duplication', {
          lines: clone.getSize()
          tokens: clone.getTokens()
        })
        duplication.ele('codefragment', clone.getLines())
        _.forEach clone.getFiles(), (file) ->
          file = duplication.ele('file', {
            path: file.getName(),
            line: file.getStartLine()
          })

    xml.end({pretty: true})
