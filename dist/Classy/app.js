'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = app;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Kick things off by getting an app token, setting it to this.appToken,
 * and starting a timeout for it to refresh.
 */
function app() {
  var _this2 = this;

  var _this = this;
  var promise = new Promise(function (resolve, reject) {
    _this2.timeoutId = undefined;

    var timeout = function timeout() {
      _this.timeoutId = setTimeout(tokenTicker, _lodash2.default.get(_this, 'appToken.expires_in', 0) * 900);
    };

    var tokenTicker = function tokenTicker() {
      _this2.getAppToken().then(function (response) {
        clearTimeout(_this.timeoutId);

        _this2.setAppToken(response);
        resolve(response);

        timeout();
      }, function (error) {
        clearTimeout(_this.timeoutId);
        console.error('App token failure');
        reject(error);
      });
    };

    timeout();
  });

  return promise;
}