'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClassyResource = function () {
  function ClassyResource(Classy, urlData) {
    _classCallCheck(this, ClassyResource);

    /** Public properties */
    this.basePath = Classy.getApiField('basePath');
    this.path = _utils.utils.makeURLInterpolator(this.path || '');

    /** Private properties */
    this._classy = Classy;
    this._urlData = urlData;
  }

  _createClass(ClassyResource, [{
    key: '_createFullPath',
    value: function _createFullPath(commandPath, urlData) {
      return _path2.default.join(this.basePath, commandPath(urlData)).replace(/\\/g, '/');
    }
  }, {
    key: '_populateUrlParams',
    value: function _populateUrlParams(params, args) {
      var urlData = {};

      for (var i in params) {
        if (typeof args[i] !== "undefined") {
          urlData[params[i]] = args[i];
        }
      }

      return urlData;
    }
  }, {
    key: 'createMethod',
    value: function createMethod(spec) {
      var _this = this;

      var OPTIONAL_REGEX = /^\?.*/g;
      var PARAM_REGEX = /\{(.*?)\}/g;

      var commandPath = _utils.utils.makeURLInterpolator(spec.path),
          requestMethod = (spec.method || 'GET').toUpperCase(),
          urlParams = _utils.utils.getRegexMatches(spec.path, PARAM_REGEX);

      return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var self = _this,
            urlData = _this._populateUrlParams(urlParams, args);

        for (var i = 0; i < urlParams.length; i++) {
          var arg = args[0],
              param = urlParams[i],
              optional = OPTIONAL_REGEX.test(param);

          /** Add required param error handling */
        }

        var requestPath = _this._createFullPath(commandPath, urlData);

        return requestPath;
      };
    }
  }]);

  return ClassyResource;
}();

exports.default = ClassyResource;