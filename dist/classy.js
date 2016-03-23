'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _resources = require('./resources');

var _resources2 = _interopRequireDefault(_resources);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Classy = function () {
  function Classy(config) {
    _classCallCheck(this, Classy);

    var DEFAULT_BASE_URL = 'https://api.classy.org';
    var DEFAULT_PATH = '2.0';
    var DEFAULT_STRICT_SSL = true;

    if (typeof config === "undefined" || typeof config.clientId === "undefined" || typeof config.clientSecret === "undefined") {
      throw new Error('Classy needs to be called with a `clientId` and `clientSecret`');
    }

    this.appToken = {};
    this.memberToken = {};

    // Set required params
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;

    // Override defaults if asked
    this.basePath = !_lodash2.default.isUndefined(config.basePath) ? config.basePath : DEFAULT_PATH;

    this.baseUrl = !_lodash2.default.isUndefined(config.baseUrl) ? config.baseUrl : DEFAULT_BASE_URL;

    this.strictSsl = !_lodash2.default.isUndefined(config.strictSsl) ? config.strictSsl : DEFAULT_STRICT_SSL;

    this._prepResources();
  }

  /**
   * Initialize the Classy instance with an application token.
   * Resolve promise once the first application token is generated.
   * Get new application token as soon as the current one expires.
   */


  _createClass(Classy, [{
    key: 'app',
    value: function app() {
      var self = this;

      var promise = new Promise(function (resolve, reject) {
        var timeoutId = undefined;
        var timeout = function timeout() {
          timeoutId = setTimeout(getToken, self.appToken.expiresIn);
        };

        // Make the actual token call
        var getToken = function getToken() {
          self.oauth.auth({
            client_id: self.clientId,
            client_secret: self.clientSecret
          }).then(function (response) {
            // Loop timeout and resolve init promise
            clearTimeout(timeoutId);
            timeout();
            resolve(response);
          }).catch(function (error) {
            // Clear timeout and reject init promise
            clearTimeout(timeout);
            reject(error);
          });
        };

        // Start the timeout looping
        timeout();
      });

      return promise;
    }
  }, {
    key: 'setTokens',
    value: function setTokens(grantType, tokenResponse) {
      switch (grantType) {
        case "client_credentials":
          this.appToken = {
            value: tokenResponse.access_token,
            expiresIn: tokenResponse.expires_in * 1000,
            expiresOn: new Date().getTime() + tokenResponse.expires_in * 1000
          };
          break;

        case "refresh_token":
          this.memberToken = {
            value: tokenResponse.access_token,
            refreshToken: tokenResponse.refresh_token,
            expiresIn: tokenResponse.expires_in * 1000,
            expiresOn: new Date().getTime() + tokenResponse.expires_in * 1000
          };
          break;

        case "password":
          this.memberToken = {
            value: tokenResponse.access_token,
            refreshToken: tokenResponse.refresh_token,
            expiresIn: tokenResponse.expires_in * 1000,
            expiresOn: new Date().getTime() + tokenResponse.expires_in * 1000
          };
          break;

        default:
          break;
      }
    }
  }, {
    key: '_prepResources',
    value: function _prepResources() {
      for (var name in _resources2.default) {
        var resourceName = name[0].toLowerCase() + name.substring(1),
            resourceInstance = new _resources2.default[name](this);

        this[resourceName] = resourceInstance;
      }
    }
  }]);

  return Classy;
}();

exports.default = Classy;