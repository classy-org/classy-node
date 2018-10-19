'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _addCustomMethods;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [_addCustomMethods description]
 * @param {[type]} methods [description]
 */
function _addCustomMethods(methods) {
  var _this = this;

  _lodash2.default.each(methods, function (params, methodName) {
    _this[methodName] = _this.createMethod(params);
  });
}