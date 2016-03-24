'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _requestDebug = require('request-debug');

var _requestDebug2 = _interopRequireDefault(_requestDebug);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _basicMethods = require('./basicMethods');

var _basicMethods2 = _interopRequireDefault(_basicMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(0, _requestDebug2.default)(_request2.default);

var ClassyResource = function () {
  function ClassyResource(Classy, urlData) {
    _classCallCheck(this, ClassyResource);

    /** Public properties */
    this.basePath = Classy.basePath;
    this.baseUrl = Classy.baseUrl;
    this.path = _utils.utils.makeURLInterpolator(this.path || '');

    /** Private properties */
    this._classy = Classy;
    this._urlData = urlData;

    // Add basic methods
    if (urlData.includeBasic) {
      this._addBasicMethods(urlData.includeBasic);
    }
  }

  _createClass(ClassyResource, [{
    key: 'createMethod',
    value: function createMethod(spec) {
      var _this2 = this;

      var OPTIONAL_REGEX = /^\?.*/g;
      var PARAM_REGEX = /\{(.*?)\}/g;

      var specPath = !_lodash2.default.isUndefined(spec.path) ? spec.path : '',
          path = this._urlData.path + specPath,
          commandPath = _utils.utils.makeURLInterpolator(path),
          requestMethod = (spec.method || 'GET').toUpperCase(),
          urlParams = _utils.utils.getRegexMatches(path, PARAM_REGEX);

      return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var _this = _this2,
            urlData = _this2._populateUrlParams(urlParams, args),
            data = _utils.utils.getDataFromArgs(args);

        for (var i = 0; i < urlParams.length; i++) {
          var arg = args[0],
              param = urlParams[i],
              optional = OPTIONAL_REGEX.test(param);

          /** TODO: Add required param error handling */
        }

        var resolvedPath = commandPath(urlData);
        var isAuthRequest = _utils.utils.isAuthRequest(resolvedPath);

        //
        var requestPath = _this2._createFullPath(resolvedPath, isAuthRequest);

        // Choose token for Authorization header
        var token = _this2._chooseToken(_this2._classy.appToken, _this2._classy.memberToken, spec.useAppToken);

        // Merge default headers with spec headers
        var requestHeaders = {
          Authorization: 'Bearer ' + token.value,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        };

        _lodash2.default.merge(requestHeaders, spec.headers);

        // Handle auth requests
        var form = false;
        if (isAuthRequest) {
          form = _this2._generateAuthForm(args);
        }

        // Make the request and return a promise
        return _this2._makeRequest(requestPath, requestMethod, requestHeaders, form, data);
      };
    }

    /**
     * Adds basic methods to the resource based on
     * the passed array.
     *
     * @param {array} basicMethodList A list of basic methods to add
     */

  }, {
    key: '_addBasicMethods',
    value: function _addBasicMethods(basicMethodList) {
      var _this = this;
      _lodash2.default.each(basicMethodList, function (method) {
        _this[method] = _this.createMethod(_basicMethods2.default[method]);
      });
    }

    /**
     * Create a full path based on the populated
     * URI and the basePath defined when the Classy
     * instance was initialized. Returns something like
     * /2.0/campaigns/23456 or /oauth2/auth.
     *
     * @param  {string}  resolvedPath  The populated URI
     * @param  {Boolean} isAuthRequest Determines whether to append basePath
     * @return {string}                The full URI for the upcoming request
     */

  }, {
    key: '_createFullPath',
    value: function _createFullPath(resolvedPath, isAuthRequest) {
      var fullPath = _path2.default.join(isAuthRequest ? '' : this.basePath, resolvedPath).replace(/\\/g, '/');

      fullPath = _path2.default.normalize(fullPath);

      return fullPath;
    }

    /**
     * Maps URL params from the spec to arguments
     * used in the actual resource call.
     *
     * @param  {array} params URL params from the spec
     * @param  {array} args   Arguments used in the resource call
     * @return {object}        A key/value mapping between params and args
     */

  }, {
    key: '_populateUrlParams',
    value: function _populateUrlParams(params, args) {
      var urlData = {};

      for (var i in params) {
        if (!_lodash2.default.isUndefined(args[i])) {
          urlData[params[i]] = args[i];
        }
      }

      return urlData;
    }

    /**
     * If there's no member token or if the endpoint
     * specifically asks to use the app token, use the
     * app token. Otherwise, use the member token.
     *
     * @param  {object} appToken    Application token
     * @param  {object} memberToken Member token
     * @param  {boolean} useAppToken Forces appToken token to win
     * @return {object}             The chosen token
     */

  }, {
    key: '_chooseToken',
    value: function _chooseToken(appToken, memberToken, useAppToken) {
      var token = undefined;

      if (!_lodash2.default.isEmpty(memberToken) && !useAppToken) {
        token = memberToken;
      } else {
        token = appToken;
      }

      return token;
    }

    /**
     * Handles authentication requests by adding
     * the appropriate x-www-form-urlencoded data
     * to the request. Camel cased keys will be
     * converted to snake case.
     *
     * @param  {array} args
     * @return {object}      A form object for the request
     */

  }, {
    key: '_generateAuthForm',
    value: function _generateAuthForm(args) {
      var form = _lodash2.default.mapKeys(args[0], function (value, key) {
        return _lodash2.default.snakeCase(key);
      }),
          grantType = _utils.utils.generateOauthGrantType(args[0]);

      form.grant_type = grantType;
      form.client_id = this._classy.clientId;
      form.client_secret = this._classy.clientSecret;

      return form;
    }

    /**
     * Makes a request to Classy's API.
     *
     * @param  {string} path    Request URI
     * @param  {string} method  Request method
     * @param  {object} headers Request headers
     * @param  {object} form    Request form (optional)
     * @return {promise}         Promise based on API request
     */

  }, {
    key: '_makeRequest',
    value: function _makeRequest(path, method, headers, form, data) {
      var _this3 = this;

      var _this = this;
      var promise = new Promise(function (resolve, reject) {
        var requestParams = {
          baseUrl: _this3.baseUrl,
          uri: path,
          method: method,
          headers: headers,
          rejectUnauthorized: false,
          form: form
        };

        if (method === 'GET') {
          requestParams.qs = data;
        } else {
          requestParams.body = JSON.stringify(data);
        }

        (0, _request2.default)(requestParams, function (err, response, body) {
          if (err) {
            reject(err);
          } else {
            body = JSON.parse(body);

            // Set tokens if it's a token request
            if (!_lodash2.default.isUndefined(form.grant_type)) {
              _this._classy.setTokens(form.grant_type, body);
            }

            resolve(body);
          }
        });
      });

      return promise;
    }
  }]);

  return ClassyResource;
}();

exports.default = ClassyResource;