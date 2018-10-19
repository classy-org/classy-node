'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _generateAuthForm;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles authentication requests by adding
 * the appropriate x-www-form-urlencoded data
 * to the request. Camel cased keys will be
 * converted to snake case.
 *
 * @param  {array} args
 * @return {object}      A form object for the request
 */
function _generateAuthForm(args) {
  var form = _lodash2.default.mapKeys(args[0], function (value, key) {
    return _lodash2.default.snakeCase(key).replace(/(\d)_/g, '$1');
  });
  var grantType = _utils.utils.generateOauthGrantType(args[0]);

  form.grant_type = grantType;
  form.client_id = form.client_id || this._classy.clientId;
  form.client_secret = form.client_secret || this._classy.clientSecret;

  return form;
}