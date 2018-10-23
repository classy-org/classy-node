'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _addBasicMethods;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _basicMethods = require('../basicMethods');

var _basicMethods2 = _interopRequireDefault(_basicMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Adds basic methods to the resource based on
 * the passed array.
 *
 * @param {array} basics A list of basic methods to add
 */
function _addBasicMethods(basics) {
  var _this = this;
  _lodash2.default.each(basics, function (method) {
    _this[method] = _this.createMethod(_basicMethods2.default[method]);
  });
}