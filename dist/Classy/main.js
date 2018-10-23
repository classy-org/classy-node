'use strict';

var _main = require('../ClassyResource/main');

var _main2 = _interopRequireDefault(_main);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _prepResources2 = require('./_prepResources');

var _prepResources3 = _interopRequireDefault(_prepResources2);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _getAppToken = require('./getAppToken');

var _getAppToken2 = _interopRequireDefault(_getAppToken);

var _setAppToken = require('./setAppToken');

var _setAppToken2 = _interopRequireDefault(_setAppToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Classy = function Classy(config) {
  _classCallCheck(this, Classy);

  var DEFAULT_BASE_URL = 'https://api.classy.org';
  var DEFAULT_PATH = '2.0';
  var DEFAULT_STRICT_SSL = true;
  var DEFAULT_REQUEST_DEBUG = true;
  var DEFAULT_REQUEST_DEBUG_ACTION = function DEFAULT_REQUEST_DEBUG_ACTION(type, data) {
    return console.log(data);
  };

  /** Handle errors */
  if (_lodash2.default.isUndefined(config) || !_lodash2.default.isUndefined(config.headers) && (_lodash2.default.isUndefined(config.clientId) || _lodash2.default.isUndefined(config.clientSecret))) {
    throw new Error('Classy needs to be called with a `clientId` and `clientSecret`');
  }

  this.appToken = null;
  this.ClassyResource = _main2.default;

  /** Set required params */
  this.clientId = config.clientId;
  this.clientSecret = config.clientSecret;

  /** Override and replace headers if config.headers is set */
  this.headers = config.headers;

  /** Override defaults if asked */
  this.requestDebug = !_lodash2.default.isUndefined(config.requestDebug) ? config.requestDebug : DEFAULT_REQUEST_DEBUG;

  this.requestDebugAction = !_lodash2.default.isUndefined(config.onRequestDebug) ? config.onRequestDebug : DEFAULT_REQUEST_DEBUG_ACTION;

  this.basePath = !_lodash2.default.isUndefined(config.basePath) ? config.basePath : DEFAULT_PATH;

  this.baseUrl = !_lodash2.default.isUndefined(config.baseUrl) ? config.baseUrl : DEFAULT_BASE_URL;

  this.strictSsl = !_lodash2.default.isUndefined(config.strictSsl) ? config.strictSsl : DEFAULT_STRICT_SSL;

  this._prepResources();
};

;

Object.assign(Classy.prototype, {
  _prepResources: _prepResources3.default,
  app: _app2.default,
  getAppToken: _getAppToken2.default,
  setAppToken: _setAppToken2.default
});

module.exports = Classy;