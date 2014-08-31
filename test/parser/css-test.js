(function() {
  var chai, _;

  _ = require("lodash");

  chai = require("chai");

  global.expect = chai.expect;

  describe('css parser', function() {
    var p, r;
    r = p = null;
    beforeEach(function() {
      var Parser, Result;
      r = p = null;
      Result = require('../../lib/result');
      Parser = require('../../lib/parser');
      r = (new Result).reset();
      p = new Parser;
      return null;
    });
    return it('finds duplicates within a file', function() {
      var clone, file, files;
      p.parse(r, './__fixtures__/css/demo.css', 10, 5);
      expect(r.getClones().length).to.equal(1);
      clone = r.getClones()[0];
      expect(clone.getSize()).to.equal(5);
      expect(clone.getTokens()).to.equal(10);
      files = clone.getFiles();
      file = files[Object.keys(files)[0]];
      expect(file.getStartLine()).to.equal(2);
      file = files[Object.keys(files)[1]];
      return expect(file.getStartLine()).to.equal(23);
    });
  });

}).call(this);
