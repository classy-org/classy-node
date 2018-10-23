'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _chooseToken;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [_chooseToken description]
 * @param  {[type]} form [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function _chooseToken(form, data) {
  var dataToken = _lodash2.default.get(data, 'token', false);
  var clientCredentialsRequest = _lodash2.default.get(form, 'grant_type', false) === 'client_credentials';

  var promise = new Promise(function (resolve, reject) {
    /** Unless it's a `client_credentials` request, pick a token */
    if (clientCredentialsRequest) {
      resolve(false);
    } else {
      if (!dataToken) {
        reject('No token defined. Expected memberToken object or `token: \'app\'`');
      } else if (dataToken === 'app') {
        resolve('app');
      } else {
        resolve('member');
      }
    }
  });

  return promise;
}