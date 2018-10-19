'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _populateUrlParams;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Maps URL params from the spec to arguments
 * used in the actual resource call.
 *
 * @param  {array} params URL params from the spec
 * @param  {array} args   Arguments used in the resource call
 * @return {object}        A key/value mapping between params and args
 */
function _populateUrlParams(params, args) {
  var urlData = {};

  for (var i in params) {
    if (!_lodash2.default.isUndefined(args[i])) {
      urlData[params[i]] = args[i];
    }
  }

  return urlData;
}