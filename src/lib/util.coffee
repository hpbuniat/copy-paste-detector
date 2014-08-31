unless String::trim then String::trim = -> @replace /^\s+|\s+$/g, ""
unless String::count then String::count = (search) ->
  m = @.match(new RegExp(search.toString().replace(/(?=[.\\+*?[^\]$(){}\|])/g, "\\"), "g"))
  r = 0
  r = parseInt m.length if m
  r

unless Array::trim then Array::trim = ->
  for d, i in @
    d.trim()

util = {
  requireDir: (dir) ->
    path = require "path"
    _ = require "lodash"
    r = {}

    filename = module.filename
    filename = module.__filename unless filename
    require("fs").readdirSync(path.normalize(path.dirname(filename) + "/" + dir)).forEach (file) ->
      if file.indexOf("abstract") == -1
        _.extend r, require(dir  + file)

    return r
}

exports.util = util
