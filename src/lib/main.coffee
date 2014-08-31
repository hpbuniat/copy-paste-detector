program = require "commander"
colors = require "colors"
pkg = require "../package.json"
collector = require "./collector"
util = require "./util"
Parser = require "./parser"
_ = require "lodash"
Result = require "./result"
Progress = require "progress"
fs = require "fs"

program
.version(pkg.version)
.option("-d, --directory", "directory to check")
.option("-D, --depth [0]", "directory depth", parseInt)
.option("-i, --include [pattern,pattern,...]", "include pattern")
.option("-e, --exclude [pattern,pattern,...]", "exclude pattern")
.option("-r, --report [pmd,json,text]", "result output")
.option("-f, --file [filename]", "Save results to a specific file")
.option("-t, --tokens [70]", "minimum number of identical tokens", parseInt)
.option("-l, --lines [5]", "minimum number of identical lines", parseInt)
.option("-F, --no-fuzz", "disable variable-fuzzing")
.parse(process.argv)

program.lines = 5 unless program.lines
program.tokens = 70 unless program.tokens
program.report = 'text' unless program.report
program.file = false unless program.file
program.directory = program.args[0] if program.args
program.directory = '.' unless program.directory
program.depth = 0 unless program.depth
program.fuzz = true unless program.fuzz?

console.log "copy-paste-detector", pkg.version, "by", pkg.author.name
if process.argv.length is 2
  program.help()
else
  try
    f = new collector
    files = f.collect(program.directory, program.depth, program.include, program.exclude)

    bar = new Progress('  parsing files :current/:total (:percent) [:bar] :etas', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: files.length
    })

    p = new Parser
    r = new Result
    _.forEach files, (file) ->
      p.parse(r, file, program.tokens, program.lines, program.fuzz)
      bar.tick()

    switch program.report
      when 'pmd', 'xml'
        report = require "./reporter/pmd"
      when 'json'
        report = require "./reporter/json"
      else
        report = require "./reporter/text"

    reporter = new report
    str = reporter.report(r.getClones(), r)
    if (program.file)
      fs.writeFileSync program.file, str
    else
      console.log str

    process.exit 1 if r.getClones().length
  catch err
    console.log "[", "copy-paste-detector".white, "]", err.toString().red
    console.log err.stack
