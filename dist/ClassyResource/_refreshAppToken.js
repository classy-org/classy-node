"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _refreshAppToken;
/**
 * If this._classy.appToken exists, just resolve,
 * if not, refresh and then resolve.
 * @return {[type]} [description]
 */
function _refreshAppToken() {
  var _this = this;

  var promise = new Promise(function (resolve, reject) {
    if (!_this._classy.appToken) {
      _this._classy.getAppToken().then(function (response) {
        _this._classy.setAppToken(response);
        resolve(response);
      }, function (error) {
        reject(error);
      });
    } else {
      resolve(_this._classy.appToken);
    }
  });

  return promise;
}