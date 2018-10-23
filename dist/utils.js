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
   *   let fn = makeURLInterpolator('some/url/{param1}/{param2}');
   *   fn({ param1: 123, param2: 456 }); // => 'some/url/123/456'
   */
  makeURLInterpolator: function () {
    var rc = {
      '\n': '\\n', '\"': '\\\"',
      '\u2028': '\\u2028', '\u2029': '\\u2029'
    };
    return function (str) {
      return new Function('o', 'return "' + str.replace(/["\n\r\u2028\u2029]/g, function ($0) {
        return rc[$0];
      }).replace(/\{([\s\S]+?)\}/g, '" + encodeURIComponent(o["$1"]) + "') + '";');
    };
  }(),

  /**
   * Returns an array of matches for an executed
   * regex search on a string. Used to find params
   * in a resource URI.
   *
   * @param  {string} string String upon which the regex is executed
   * @param  {regex} regex  Regex to execute
   * @param  {integer} index  Capturing group to target
   * @return {[type]}        Match groups extracted from regex execution
   */
  getRegexMatches: function getRegexMatches(string, regex, index) {
    index || (index = 1); // default to the first capturing group
    var matches = [],
        match = void 0;

    while (match = regex.exec(string)) {
      matches.push(match[index]);
    }

    return matches;
  },

  /**
   * Checks the options object for the telltale
   * signs of each grant_type and returns whichever
   * grant type it lands on.
   *
   * Defaults to "client_credentials"
   *
   * @param  {object} options Object developer defined for the oauth request
   * @return {string}         The appropriate grant_type for the API request
   */
  generateOauthGrantType: function generateOauthGrantType(options) {
    var grantType = '';
    if (options.username && options.password) {
      grantType = 'password';
    } else if (options.refreshToken) {
      grantType = 'refresh_token';
    } else if (options.code) {
      grantType = 'authorization_code';
    } else if (options.facebookCode) {
      grantType = 'facebook_authorization_code';
    } else {
      grantType = 'client_credentials';
    }

    return grantType;
  },

  /**
   * Simply checks the resolved URI to see if
   * we are making an auth request.
   *
   * @param  {string} resolvedPath The resolved URI
   * @return {boolean}              Indicates whether this is an auth request
   */
  isAuthRequest: function isAuthRequest(resolvedPath) {
    var isAuth = false;

    switch (resolvedPath) {
      case '/oauth2/auth':
        isAuth = true;
        break;
      default:
        isAuth = false;
        break;
    }

    return isAuth;
  },

  /**
   * Return the data argument from a list of arguments
   */
  getDataFromArgs: function getDataFromArgs(args) {
    if (args.length > 0) {
      if (_lodash2.default.isObject(args[args.length - 1])) {
        return _lodash2.default.last(args);
      } else {
        return {};
      }
    } else {
      return {};
    }
  }
};