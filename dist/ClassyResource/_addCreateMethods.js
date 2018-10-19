'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _addCreateMethods;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resources = require('../resources.json');

/**
 * Adds list methods to the resource based on
 * the passed array. Lists are resources associated
 * with the called resource, e.g. campaigns.listFaqs(#)
 *
 * @param {array} lists A list of list methods to add
 */
function _addCreateMethods(lists) {
  var _this = this;

  _lodash2.default.each(lists, function (method) {
    var uppercaseMethod = _lodash2.default.upperFirst(_lodash2.default.camelCase(method));
    var methodName = uppercaseMethod.substr(0, uppercaseMethod.length - 1);
    var resourceDefintion = resources[uppercaseMethod];

    _this['create' + methodName] = _this.createMethod({
      method: 'POST',
      path: '/{id}/' + method,
      basePath: _lodash2.default.get(resourceDefintion, 'basePath')
    });
  });
}