'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

var _classyMethod = require('./classyMethod');

var _classyMethod2 = _interopRequireDefault(_classyMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClassyResource = function () {
  function ClassyResource(Classy, urlData) {
    _classCallCheck(this, ClassyResource);

    /** Public properties */
    this.basePath = _utils.utils.makeURLInterpolator(Classy.getApiField('basePath'));
    this.path = _utils.utils.makeURLInterpolator(this.path || '');
    this.method = _classyMethod2.default;

    /** Private properties */
    this._classy = Classy;
    this._urlData = urlData;
  }

  _createClass(ClassyResource, [{
    key: 'createUrlData',
    value: function createUrlData() {
      for (var i in this._urlData) {
        if (this._urlData.hasOwnProperty(i)) {
          urlData[i] = this._urlData[i];
        }
      }
    }
  }]);

  return ClassyResource;
}();

exports.default = ClassyResource;