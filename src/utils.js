import _ from 'lodash';

export const utils = {
  /**
   * https://gist.github.com/padolsey/6008842
   * Outputs a new function with interpolated object property values.
   * Use like so:
   *   var fn = makeURLInterpolator('some/url/{param1}/{param2}');
   *   fn({ param1: 123, param2: 456 }); // => 'some/url/123/456'
   */
  makeURLInterpolator: (function() {
    const rc = {
      '\n': '\\n', '\"': '\\\"',
      '\u2028': '\\u2028', '\u2029': '\\u2029',
    };
    return (str) => {
      return new Function(
        'o',
        'return "' + (
          str
          .replace(/["\n\r\u2028\u2029]/g, ($0) => {
            console.log('////////', $0);
            return rc[$0];
          })
          .replace(/\{([\s\S]+?)\}/g, '" + encodeURIComponent(o["$1"]) + "')
        ) + '";'
      );
    };
  }()),
  getDataFromArgs: (args) => {
    if (args.length > 0) {
      if (_.isPlainObject(args[0])) {
        return args.shift();
      }
    }
    
    return {};
  },
  getRegexMatches: (string, regex, index) => {
    index || (index = 1); // default to the first capturing group
    var matches = [];
    var match;
    while (match = regex.exec(string)) {
      matches.push(match[index]);
    }
    return matches;
  }
}
