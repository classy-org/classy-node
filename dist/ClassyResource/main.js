'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _requestDebug = require('request-debug');

var _requestDebug2 = _interopRequireDefault(_requestDebug);

var _utils = require('../utils');

var _addBasicMethods2 = require('./_addBasicMethods');

var _addBasicMethods3 = _interopRequireDefault(_addBasicMethods2);

var _addCreateMethods2 = require('./_addCreateMethods');

var _addCreateMethods3 = _interopRequireDefault(_addCreateMethods2);

var _addCustomMethods2 = require('./_addCustomMethods');

var _addCustomMethods3 = _interopRequireDefault(_addCustomMethods2);

var _addListMethods2 = require('./_addListMethods');

var _addListMethods3 = _interopRequireDefault(_addListMethods2);

var _chooseToken2 = require('./_chooseToken');

var _chooseToken3 = _interopRequireDefault(_chooseToken2);

var _createFullPath2 = require('./_createFullPath');

var _createFullPath3 = _interopRequireDefault(_createFullPath2);

var _generateAuthForm2 = require('./_generateAuthForm');

var _generateAuthForm3 = _interopRequireDefault(_generateAuthForm2);

var _makeRequest2 = require('./_makeRequest');

var _makeRequest3 = _interopRequireDefault(_makeRequest2);

var _populateUrlParams2 = require('./_populateUrlParams');

var _populateUrlParams3 = _interopRequireDefault(_populateUrlParams2);

var _refreshAppToken2 = require('./_refreshAppToken');

var _refreshAppToken3 = _interopRequireDefault(_refreshAppToken2);

var _createMethod = require('./createMethod');

var _createMethod2 = _interopRequireDefault(_createMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClassyResource = function ClassyResource(Classy, urlData) {
  var _this = this;

  _classCallCheck(this, ClassyResource);

  /** Public properties */
  this.basePath = urlData.basePath || Classy.basePath;
  this.baseUrl = Classy.baseUrl;
  this.path = _utils.utils.makeURLInterpolator(this.path || '');

  /** Private properties */
  this._classy = Classy;
  this._urlData = urlData;

  /** Request debug setting */
  if (this._classy.requestDebug) {
    (0, _requestDebug2.default)(_request2.default, function (type, data, r) {
      if (r.headers['x-no-log']) {
        return;
      } else {
        _this._classy.requestDebugAction(type, data, r);
      }
    });
  }

  /** Add basic methods */
  if (urlData.basic) {
    this._addBasicMethods(urlData.basic);
  }

  /** Add list methods */
  if (urlData.lists) {
    this._addListMethods(urlData.lists);
  }

  /** Add create methods */
  if (urlData.creates) {
    this._addCreateMethods(urlData.creates);
  }

  /** Add custom methods */
  if (urlData.custom && urlData.custom.methods) {
    this._addCustomMethods(urlData.custom.methods);
  }
};

exports.default = ClassyResource;


Object.assign(ClassyResource.prototype, {
  _addBasicMethods: _addBasicMethods3.default,
  _addCreateMethods: _addCreateMethods3.default,
  _addCustomMethods: _addCustomMethods3.default,
  _addListMethods: _addListMethods3.default,
  _chooseToken: _chooseToken3.default,
  _createFullPath: _createFullPath3.default,
  _generateAuthForm: _generateAuthForm3.default,
  _makeRequest: _makeRequest3.default,
  _populateUrlParams: _populateUrlParams3.default,
  _refreshAppToken: _refreshAppToken3.default,
  createMethod: _createMethod2.default
});