'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _prepResources;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _main = require('../ClassyResource/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resources = require('../resources.json');

/** Add resource methods based on resources.json */
function _prepResources() {
  var _this = this;

  _lodash2.default.each(resources, function (urlData, name) {
    var resourceName = _lodash2.default.camelCase(name);
    var resourceInstance = new _main2.default(_this, urlData);

    _this[resourceName] = resourceInstance;
  });
}