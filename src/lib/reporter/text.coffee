_ = require "lodash"
util = require "util"

module.exports = class ReportText
  report: (clones, result) ->
    num = clones.length
    str = r = ""
    if num
      files = {}
      lines = 0
      _.forEach clones, (clone) ->

        lines += (clone.getSize() * (Object.keys(clone.getFiles()).length - 1))
        str += "\n  -"

        _.forEach clone.getFiles(), (file) ->
          str += util.format "\t%s:%d-%d\n", file.getName(),
            file.getStartLine(), file.getStartLine()+clone.getSize()
          files[file.getName()] = file

      r += util.format "Found %d exact clones with %d duplicated lines in %d files:\n%s",
        num, lines, Object.keys(files).length, str

    r += util.format "%s%% duplicated lines out of %d total lines of code.\n",
      result.getPercentage(), result.getLines()

    r
