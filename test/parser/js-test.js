(function() {
  var chai, _;

  _ = require("lodash");

  chai = require("chai");

  global.expect = chai.expect;

  describe('js parser', function() {
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
    it('finds duplicates within a file', function() {
      var clone, file, files;
      p.parse(r, './__fixtures__/js/Math.js', 70, 5);
      expect(r.getClones().length).to.equal(2);
      clone = r.getClones()[0];
      expect(clone.getSize()).to.equal(26);
      expect(clone.getTokens()).to.equal(166);
      files = clone.getFiles();
      file = files[Object.keys(files)[0]];
      expect(file.getStartLine()).to.equal(41);
      file = files[Object.keys(files)[1]];
      return expect(file.getStartLine()).to.equal(68);
    });
    it('find duplicated files', function() {
      var clone, file, files;
      p.parse(r, './__fixtures__/js/a.js', 60, 20);
      p.parse(r, './__fixtures__/js/b.js', 60, 20);
      expect(r.getClones().length).to.equal(1);
      clone = r.getClones()[0];
      expect(clone.getSize()).to.equal(20);
      expect(clone.getTokens()).to.equal(121);
      files = clone.getFiles();
      file = files[Object.keys(files)[0]];
      expect(file.getName()).to.equal('./__fixtures__/js/a.js');
      expect(file.getStartLine()).to.equal(3);
      file = files[Object.keys(files)[1]];
      expect(file.getName()).to.equal('./__fixtures__/js/b.js');
      return expect(file.getStartLine()).to.equal(3);
    });
    it('find duplicates in more than 2 files', function() {
      var clone, file, files;
      p.parse(r, './__fixtures__/js/a.js', 60, 20);
      p.parse(r, './__fixtures__/js/b.js', 60, 20);
      p.parse(r, './__fixtures__/js/c.js', 60, 20);
      expect(_.size(r.getCloneMap())).to.equal(1);
      clone = r.getClones()[0];
      expect(clone.getSize()).to.equal(20);
      expect(clone.getTokens()).to.equal(121);
      files = clone.getFiles();
      file = files[Object.keys(files)[0]];
      expect(file.getName()).to.equal('./__fixtures__/js/a.js');
      expect(file.getStartLine()).to.equal(3);
      file = files[Object.keys(files)[1]];
      expect(file.getName()).to.equal('./__fixtures__/js/b.js');
      expect(file.getStartLine()).to.equal(3);
      file = files[Object.keys(files)[2]];
      expect(file.getName()).to.equal('./__fixtures__/js/c.js');
      return expect(file.getStartLine()).to.equal(3);
    });
    it('should ignore duplications, if they cover less tokens than min-tokens', function() {
      p.parse(r, './__fixtures__/js/a.js', 122, 20);
      p.parse(r, './__fixtures__/js/b.js', 122, 20);
      return expect(r.getClones().length).to.equal(0);
    });
    it('should ignore duplications, if they cover less lines than min-lines', function() {
      p.parse(r, './__fixtures__/js/a.js', 60, 21);
      p.parse(r, './__fixtures__/js/b.js', 60, 21);
      return expect(r.getClones().length).to.equal(0);
    });
    it('should ignore comments', function() {
      p.parse(r, './__fixtures__/js/e.js', 10, 8);
      p.parse(r, './__fixtures__/js/f.js', 10, 8);
      return expect(r.getClones().length).to.equal(0);
    });
    return it('should ignore comments', function() {
      p.parse(r, './__fixtures__/js/e.js', 10, 7);
      p.parse(r, './__fixtures__/js/f.js', 10, 7);
      return expect(r.getClones().length).to.equal(1);
    });
  });

}).call(this);
