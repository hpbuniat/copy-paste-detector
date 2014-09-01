wrench = require "wrench"
minimatch = require "minimatch"
_ = require "lodash"
path = require "path"
fs = require "fs"

module.exports = class Collector

  collect: (directory, depth, include, exclude) ->
    files = wrench.readdirSyncRecursive(directory)
    include = "*" unless include
    exclude = "" unless exclude

    includes = include.split(",").trim()
    excludes = _.filter exclude.split(",").trim(), (item) ->
      return !!item.length

    _.forEach files, (item, i) ->
      files[i] = path.normalize(directory + path.sep + item)

    files = _.filter files, (item, i) ->
      relDepth = path.normalize(directory + path.sep).count(path.sep)

      i = false
      e = false
      f = fs.lstatSync(item).isFile()
      o = {
        dot: true,
        nocase: true,
        matchBase: true
      }

      for include, d in includes
        i = minimatch(item, include, o)
        break if i

      for exclude, d in excludes
        if exclude.indexOf('*') == -1
          e = !!item.match(new RegExp(exclude))
          break if e
        else
          e = minimatch(item, exclude, o)
          break if e

      if depth && i
        i = (item.count(path.sep) - relDepth <= depth - 1)

      return (f && i && !e)

    return files
