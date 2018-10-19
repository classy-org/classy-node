'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createMethod;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [createMethod description]
 * @param {Object} spec            Options for method, the current options are:
 *                                 method: HTTP Request verb
 *                                 path: Path that will be appended to the curent resource's path
 *                                 headers: Custom HTTP headers
 *                                 basePath: Override the current resource's bathPath
 *
 * @return {Function}              The resource method
 */
function createMethod(spec) {
  var _this2 = this;

  var PARAM_REGEX = /\{(.*?)\}/g;

  /** Get parameterized request URL and method */
  var specPath = !_lodash2.default.isUndefined(spec.path) ? spec.path : '';
  var fullPath = this._urlData.path + specPath;
  var commandPath = _utils.utils.makeURLInterpolator(fullPath);
  var urlParams = _utils.utils.getRegexMatches(fullPath, PARAM_REGEX);
  var requestMethod = _lodash2.default.get(spec, 'method', 'GET').toUpperCase();

  /** Return resource method */
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /** Extract data from function arguments */
    var _this = _this2;
    var urlData = _this2._populateUrlParams(urlParams, args);
    var data = _utils.utils.getDataFromArgs(args);

    /** Error if not all required params are satisfied */
    for (var i = 0; i < urlParams.length; i++) {
      var arg = args[0];
      var param = urlParams[i];

      if (!arg) {
        throw new Error('Classy: Argument "' + urlParams[i] + '" required, but got: ' + arg + ' (on API request to ' + requestMethod + ' ' + commandPath(urlData) + ')');
      }
    }

    /** Create full request path with resolved params */
    var resolvedPath = commandPath(urlData);
    var isAuthRequest = _utils.utils.isAuthRequest(resolvedPath);
    var requestPath = _this2._createFullPath(resolvedPath, isAuthRequest, spec.basePath);

    /** Populate form data for authorization requests */
    var form = false;
    if (isAuthRequest) {
      form = _this2._generateAuthForm(args);
    }

    /**
     * Token stuff & requests need to be synchronous with refresh
     */
    return _this2._chooseToken(form, data).then(function (response) {
      var DEFAULT_REQUEST_HEADERS = {
        Accept: 'application/json'
      };

      var requestHeaders = _this2._classy.headers || _lodash2.default.merge(DEFAULT_REQUEST_HEADERS, spec.headers);

      if (requestMethod == 'POST' || requestMethod == 'PUT' || requestMethod == 'PATCH' && !isAuthRequest) {
        requestHeaders['Content-Type'] = 'application/json';
      }

      if (!response) {
        return _this2._makeRequest(requestPath, requestMethod, requestHeaders, form, data);
      }

      if (response === 'app') {
        return _this2._refreshAppToken().then(function (response) {
          var appToken = _lodash2.default.get(_this2._classy.appToken, 'access_token', null);
          delete data.token;

          requestHeaders.Authorization = 'Bearer ' + appToken;

          return _this2._makeRequest(requestPath, requestMethod, requestHeaders, form, data);
        }, function (error) {
          console.error('App token refresh failed: ', error);
        });
      }

      if (response === 'member') {
        var memberToken = _lodash2.default.get(data, 'token.access_token', false);
        delete data.token;

        requestHeaders.Authorization = 'Bearer ' + memberToken;

        return _this2._makeRequest(requestPath, requestMethod, requestHeaders, form, data);
      }
    }, function (error) {
      throw new Error('No token defined. Expected memberToken object or `token: \'app\'`');
    });
  };
}