'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (spec) {
  var _arguments = arguments;

  var urlParams = spec.urlParams || [],
      requestMethod = (spec.method || 'GET').toUpperCase(),
      commandPath = _utils.utils.makeURLInterpolator(spec.path || '');

  console.log(spec.path, commandPath('a'));

  return function () {
    var args = [].slice.call(_arguments);

    for (var i = 0, l = urlParams.length; i < l; ++i) {}

    var a = new Promise(function (resolve, reject) {
      resolve(urlParams);
    });

    return a;
  };
};

var _utils = require('./utils');