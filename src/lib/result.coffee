_ = require "lodash"

module.exports = class Result

  lines: 0
  clones: []
  cloneMap: {}

  reset: () ->
    @lines = 0
    @clones = []
    @cloneMap = {}
    @

  addLines: (lines) ->
    @lines += lines
    @

  getLines: ->
    @lines

  addClone: (clone) ->
    @clones.push clone

    id = clone.getId()
    if @cloneMap[id]?
      origClone = @cloneMap[id]
      _.forEach clone.getFiles(), (file) ->
        origClone.addFile file
    else
      @cloneMap[id] = clone

    @

  getClones: ->
    @clones

  getCloneMap: ->
    @cloneMap

  getPercentage: ->
    lines = 0
    _.forEach @clones, (clone) ->
      lines += clone.getSize()

    str = 0
    if @lines
      str = (lines / @lines).toFixed(2)

    str