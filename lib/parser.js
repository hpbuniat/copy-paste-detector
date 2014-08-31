(function() {
  var Parser, cloneContent, cloneFile, crc, crypto, fs, mime, path, util, _;

  fs = require("fs");

  path = require("path");

  _ = require("lodash");

  util = require("./util");

  crc = require("crc");

  crypto = require("crypto");

  cloneContent = require("./clone/content");

  cloneFile = require("./clone/file");

  mime = require("mime");

  module.exports = Parser = (function() {
    Parser.prototype.lng = {};

    Parser.prototype.hashes = {};

    function Parser() {
      _.extend(this.lng, util.util.requireDir("./parser/"));
      _.forEach(this.lng, (function(_this) {
        return function(parser, i) {
          _this.lng[i] = new parser;
          return null;
        };
      })(this));
    }

    Parser.prototype.parse = function(result, file, tokens, lines, fuzzy) {
      var data, err, stack;
      data = fs.readFileSync(file);
      result.addLines(data.toString().split("\n").length);
      try {
        stack = this.delegate(file, data.toString(), fuzzy);
        return this.analyze(result, file, stack, tokens, lines);
      } catch (_error) {
        err = _error;
        console.log(err.toString().red);
        console.log(err.stack);
        return null;
      }
    };

    Parser.prototype.delegate = function(file, data, fuzzy) {
      var ext, parse;
      ext = (path.extname(file)).substr(1);
      parse = _.filter(this.lng, function(parser) {
        return parser.registers(mime.lookup(file), ext);
      });
      parse = _.sortBy(parse, 'weigth');
      if (parse.length) {
        parse = _.last(parse);
      } else {
        parse = null;
      }
      if (parse == null) {
        throw new Error("filetype not handled: " + file);
      }
      return parse.parse(file, data, fuzzy);
    };

    Parser.prototype.analyze = function(result, file, stack, tokens, lines) {
      var f, firstHash, firstLine, firstToken, hash, i, sig, tokenPos;
      sig = '';
      tokenPos = [];
      _.forEach(stack, function(token, i) {
        sig += crc.crc8(token.type) + crc.crc32(token.value);
        tokenPos[i] = token.line;
        return null;
      });
      firstLine = firstHash = firstToken = i = 0;
      f = false;
      while (i <= (tokenPos.length - tokens)) {
        hash = crypto.createHash('md5').update(sig.substr(i * 10, tokens * 10)).digest('hex');
        if (this.hashes[hash]) {
          f = true;
          if (firstLine === 0) {
            firstLine = tokenPos[i];
            firstHash = hash;
            firstToken = i;
          }
        } else {
          if (f) {
            this.addClone(result, file, tokenPos, lines, tokens, i, firstToken, firstLine, firstHash);
            f = false;
            firstLine = 0;
          }
          this.hashes[hash] = {
            file: file,
            line: tokenPos[i]
          };
        }
        i++;
      }
      if (f) {
        this.addClone(result, file, tokenPos, lines, tokens, i, firstToken, firstLine, firstHash);
      }
      return this;
    };

    Parser.prototype.addClone = function(result, file, tokenPos, lines, tokens, i, firstToken, firstLine, firstHash) {
      var cloneEndToken, cloneLines, cloneStartFile, cloneStartLine, compareCloneLines, d, _i;
      cloneStartFile = this.hashes[firstHash].file;
      cloneStartLine = this.hashes[firstHash].line;
      cloneEndToken = (parseInt(i) - 1) + parseInt(tokens) - 1;
      cloneLines = parseInt(tokenPos[cloneEndToken]) + 1 - firstLine;
      compareCloneLines = [];
      for (d = _i = firstToken; firstToken <= cloneEndToken ? _i <= cloneEndToken : _i >= cloneEndToken; d = firstToken <= cloneEndToken ? ++_i : --_i) {
        if (tokenPos[d]) {
          compareCloneLines.push(tokenPos[d]);
        }
      }
      compareCloneLines = _.uniq(compareCloneLines).length;
      if (compareCloneLines >= lines && (file !== cloneStartFile || firstLine !== cloneStartLine)) {
        result.addClone(new cloneContent(new cloneFile(cloneStartFile, cloneStartLine), new cloneFile(file, firstLine), cloneLines, cloneEndToken + 1 - firstToken));
      }
      return this;
    };

    return Parser;

  })();

}).call(this);
