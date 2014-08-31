_ = require "lodash"
util = require "util"

module.exports = class ReportJson
  report: (clones, result) ->
    num = clones.length
    res = {}
    if num
      files = {}
      lines = 0
      _.forEach clones, (clone) ->

        lines += (clone.getSize() * (Object.keys(clone.getFiles()).length - 1))
        _.forEach clone.getFiles(), (file) ->
          files[file.getName()] = {
            start: file.getStartLine()
            end: file.getStartLine()+clone.getSize()
            size: clone.getSize()
          }

      res.files = files
      res.clonedLines = lines

    res.percentage = result.getPercentage()
    res.lines = result.getLines()
    res.clones = num
    JSON.stringify(res)
