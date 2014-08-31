(function() {
  var AbstractParser;

  module.exports = AbstractParser = (function() {
    function AbstractParser() {}

    AbstractParser.prototype.weigth = 0;

    AbstractParser.prototype.ignores = function(token) {
      return false;
    };

    AbstractParser.prototype.registers = function(mime, extension) {
      return false;
    };

    return AbstractParser;

  })();

}).call(this);
