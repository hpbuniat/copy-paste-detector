(function() {
  var chai;

  chai = require('chai');

  global.expect = chai.expect;

  describe('result', function() {
    return it('adds lines to the result', function() {
      var Result, r;
      Result = require('../lib/result');
      r = new Result;
      expect(r.getLines()).to.equal(0);
      r.addLines(10);
      return expect(r.getLines()).to.equal(10);
    });
  });

}).call(this);
