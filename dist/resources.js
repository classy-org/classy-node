'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requireDir = require('require-dir');

var _requireDir2 = _interopRequireDefault(_requireDir);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resourceFolders = (0, _requireDir2.default)('./resources');
var resources = _lodash2.default.mapValues(resourceFolders, function (value) {
  return value.default;
});

exports.default = resources;