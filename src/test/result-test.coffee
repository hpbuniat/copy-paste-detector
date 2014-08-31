chai = require('chai')
global.expect = chai.expect

describe 'result', ->
  it 'adds lines to the result', ->
    Result = require '../lib/result'
    r = new Result
    expect(r.getLines()).to.equal(0)
    r.addLines(10)
    expect(r.getLines()).to.equal(10)