'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utils = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = exports.utils = {
  /**
   * https://gist.github.com/padolsey/6008842
   * Outputs a new function with interpolated object property values.
   * Use like so:
   *   var fn = makeURLInterpolator('some/url/{param1}/{param2}');
   *   fn({ param1: 123, param2: 456 }); // => 'some/url/123/456'
   */
  makeURLInterpolator: function () {
    var rc = {
      '\n': '\\n', '\"': '\\\"',
      '\u2028': '\\u2028', '\u2029': '\\u2029'
    };
    return function (str) {
      return new Function('o', 'return "' + str.replace(/["\n\r\u2028\u2029]/g, function ($0) {
        console.log('////////', $0);
        return rc[$0];
      }).replace(/\{([\s\S]+?)\}/g, '" + encodeURIComponent(o["$1"]) + "') + '";');
    };
  }(),
  getDataFromArgs: function getDataFromArgs(args) {
    if (args.length > 0) {
      if (_lodash2.default.isPlainObject(args[0])) {
        return args.shift();
      }
    }

    return {};
  },
  getRegexMatches: function getRegexMatches(string, regex, index) {
    index || (index = 1); // default to the first capturing group
    var matches = [];
    var match;
    while (match = regex.exec(string)) {
      matches.push(match[index]);
    }
    return matches;
  }
};