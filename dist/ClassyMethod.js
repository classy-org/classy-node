'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClassyMethod = function ClassyMethod(spec) {
  _classCallCheck(this, ClassyMethod);

  var urlParams = spec.urlParams,
      requestMethod = (spec.method || 'GET').toUpperCase(),
      commandPath = typeof spec.path === 'function' ? spec.path : _utils.utils.makeURLInterpolator(spec.path || '');
};

exports.default = ClassyMethod;