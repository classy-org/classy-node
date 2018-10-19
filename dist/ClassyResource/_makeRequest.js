'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _makeRequest;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Makes a request to Classy's API.
 *
 * @param  {string} path    Request URI
 * @param  {string} method  Request method
 * @param  {object} headers Request headers
 * @param  {object} form    Request form (optional)
 * @return {promise}         Promise based on API request
 */
function _makeRequest(path, method, headers, form, data) {
  var _this2 = this;

  var _this = this;
  var forceQs = null;

  if (data.noLog) {
    headers['x-no-log'] = true;
    delete data.noLog;
  }

  if (_lodash2.default.isObject(data.qs)) {
    forceQs = data.qs;
    delete data.qs;
  }

  var promise = new Promise(function (resolve, reject) {
    var requestParams = {
      baseUrl: _this2.baseUrl,
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

    if (forceQs) {
      requestParams.qs = _lodash2.default.merge(requestParams.qs || {}, forceQs);
    }

    (0, _request2.default)(requestParams, function (err, response, body) {
      if (err || !/^2/.test('' + response.statusCode)) {
        var error = void 0;
        if (err && err instanceof Error) {
          error = err;
        } else if (err && !(err instanceof Error)) {
          var errorString = JSON.stringify(err);
          error = new Error(errorString);
        } else {
          var _errorString = body ? JSON.stringify(body) : 'Non-200 response';
          error = new Error(_errorString);
          error.statusCode = response.statusCode;
        }

        reject(error);
      } else {
        body = body ? JSON.parse(body) : {};
        resolve(body);
      }
    });
  });

  return promise;
}