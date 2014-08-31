_ = require "lodash"
chai = require "chai"
global.expect = chai.expect

describe 'php parser', ->
  r = p = null

  beforeEach ->
    r = p = null

    Result = require '../../lib/result'
    Parser = require '../../lib/parser'

    r = (new Result).reset()
    p = new Parser
    null

  it 'finds duplicates within a file', ->
    p.parse r, './__fixtures__/php/Math.php', 70, 5

    expect(r.getClones().length).to.equal(1)

    clone = r.getClones()[0]
    expect(clone.getSize()).to.equal(59)
    expect(clone.getTokens()).to.equal(136)

    files = clone.getFiles()
    file = files[Object.keys(files)[0]]
    expect(file.getStartLine()).to.equal(85)

    file = files[Object.keys(files)[1]]
    expect(file.getStartLine()).to.equal(149)

  it 'find duplicated files', ->
    p.parse r, './__fixtures__/php/a.php', 60, 20
    p.parse r, './__fixtures__/php/b.php', 60, 20

    expect(r.getClones().length).to.equal(1)

    clone = r.getClones()[0]
    expect(clone.getSize()).to.equal(20)
    expect(clone.getTokens()).to.equal(60)

    files = clone.getFiles()
    file = files[Object.keys(files)[0]]
    expect(file.getName()).to.equal('./__fixtures__/php/a.php')
    expect(file.getStartLine()).to.equal(4)

    file = files[Object.keys(files)[1]]
    expect(file.getName()).to.equal('./__fixtures__/php/b.php')
    expect(file.getStartLine()).to.equal(4)

  it 'find duplicates in more than 2 files', ->
    p.parse r, './__fixtures__/php/a.php', 60, 20
    p.parse r, './__fixtures__/php/b.php', 60, 20
    p.parse r, './__fixtures__/php/c.php', 60, 20

    expect(_.size(r.getCloneMap())).to.equal(1)

    clone = r.getClones()[0]
    expect(clone.getSize()).to.equal(20)
    expect(clone.getTokens()).to.equal(60)

    files = clone.getFiles()
    file = files[Object.keys(files)[0]]
    expect(file.getName()).to.equal('./__fixtures__/php/a.php')
    expect(file.getStartLine()).to.equal(4)

    file = files[Object.keys(files)[1]]
    expect(file.getName()).to.equal('./__fixtures__/php/b.php')
    expect(file.getStartLine()).to.equal(4)

    file = files[Object.keys(files)[2]]
    expect(file.getName()).to.equal('./__fixtures__/php/c.php')
    expect(file.getStartLine()).to.equal(4)

  it 'should ignore duplications, if they cover less tokens than min-tokens', ->
    p.parse r, './__fixtures__/php/a.php', 61, 20
    p.parse r, './__fixtures__/php/b.php', 61, 20

    expect(r.getClones().length).to.equal(0)

  it 'should ignore duplications, if they cover less lines than min-lines', ->
    p.parse r, './__fixtures__/php/a.php', 60, 21
    p.parse r, './__fixtures__/php/b.php', 60, 21

    expect(r.getClones().length).to.equal(0)

  it 'should ignore comments', ->
    p.parse r, './__fixtures__/php/e.php', 10, 8
    p.parse r, './__fixtures__/php/f.php', 10, 8

    expect(r.getClones().length).to.equal(0)

  it 'should ignore comments', ->
    p.parse r, './__fixtures__/php/e.php', 10, 7
    p.parse r, './__fixtures__/php/f.php', 10, 7

    expect(r.getClones().length).to.equal(1)