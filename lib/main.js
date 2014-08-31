(function() {
  var Parser, Progress, Result, bar, collector, colors, err, f, files, fs, p, pkg, program, r, report, reporter, str, util, _;

  program = require("commander");

  colors = require("colors");

  pkg = require("../package.json");

  collector = require("./collector");

  util = require("./util");

  Parser = require("./parser");

  _ = require("lodash");

  Result = require("./result");

  Progress = require("progress");

  fs = require("fs");

  program.version(pkg.version).option("-d, --directory", "directory to check").option("-D, --depth [0]", "directory depth", parseInt).option("-i, --include [pattern,pattern,...]", "include pattern").option("-e, --exclude [pattern,pattern,...]", "exclude pattern").option("-r, --report [pmd,json,text]", "result output").option("-f, --file [filename]", "Save results to a specific file").option("-t, --tokens [70]", "minimum number of identical tokens", parseInt).option("-l, --lines [5]", "minimum number of identical lines", parseInt).option("-F, --no-fuzz", "disable variable-fuzzing").parse(process.argv);

  if (!program.lines) {
    program.lines = 5;
  }

  if (!program.tokens) {
    program.tokens = 70;
  }

  if (!program.report) {
    program.report = 'text';
  }

  if (!program.file) {
    program.file = false;
  }

  if (program.args) {
    program.directory = program.args[0];
  }

  if (!program.directory) {
    program.directory = '.';
  }

  if (!program.depth) {
    program.depth = 0;
  }

  if (program.fuzz == null) {
    program.fuzz = true;
  }

  console.log("copy-paste-detector", pkg.version, "by", pkg.author.name);

  if (process.argv.length === 2) {
    program.help();
  } else {
    try {
      f = new collector;
      files = f.collect(program.directory, program.depth, program.include, program.exclude);
      bar = new Progress('  parsing files :current/:total (:percent) [:bar] :etas', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: files.length
      });
      p = new Parser;
      r = new Result;
      _.forEach(files, function(file) {
        p.parse(r, file, program.tokens, program.lines, program.fuzz);
        return bar.tick();
      });
      switch (program.report) {
        case 'pmd':
        case 'xml':
          report = require("./reporter/pmd");
          break;
        case 'json':
          report = require("./reporter/json");
          break;
        default:
          report = require("./reporter/text");
      }
      reporter = new report;
      str = reporter.report(r.getClones(), r);
      if (program.file) {
        fs.writeFileSync(program.file, str);
      } else {
        console.log(str);
      }
      if (r.getClones().length) {
        process.exit(1);
      }
    } catch (_error) {
      err = _error;
      console.log("[", "copy-paste-detector".white, "]", err.toString().red);
      console.log(err.stack);
    }
  }

}).call(this);
