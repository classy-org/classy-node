'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setAppToken;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Set app token and then nullify on exiration */
function setAppToken(value) {
  var _this = this;
  if (_lodash2.default.get(value, 'expires_in', false)) {
    _this.appToken = value;

    // Remove stored app token reference after expiration
    setTimeout(function () {
      _this.appToken = null;
    }, _this.appToken.expires_in * 1000);
  } else {
    throw new Error('Not a valid app token, cannot be set:', value);
  }
}