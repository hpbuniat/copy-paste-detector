_ = require "lodash"
chai = require "chai"
global.expect = chai.expect

describe 'css parser', ->
  r = p = null

  beforeEach ->
    r = p = null

    Result = require '../../lib/result'
    Parser = require '../../lib/parser'

    r = (new Result).reset()
    p = new Parser
    null

  it 'finds duplicates within a file', ->
    p.parse r, './__fixtures__/css/demo.css', 10, 5

    expect(r.getClones().length).to.equal(1)

    clone = r.getClones()[0]
    expect(clone.getSize()).to.equal(5)
    expect(clone.getTokens()).to.equal(10)

    files = clone.getFiles()
    file = files[Object.keys(files)[0]]
    expect(file.getStartLine()).to.equal(2)

    file = files[Object.keys(files)[1]]
    expect(file.getStartLine()).to.equal(23)