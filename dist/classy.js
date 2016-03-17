'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _resources = require('./resources');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Classy = function () {
  function Classy(config) {
    _classCallCheck(this, Classy);

    this.DEFAULT_BASE_URL = 'https://api.classy.org';
    this.DEFAULT_PATH = '2.0';
    this.DEFAULT_STRICT_SSL = true;

    this._api = {
      baseUrl: this.DEFAULT_BASE_URL,
      basePath: this.DEFAULT_PATH,
      strictSsl: this.DEFAULT_STRICT_SSL
    };

    if (typeof config === "undefined" || typeof config.key === "undefined" || typeof config.secret === "undefined") {
      throw new Error('Classy needs to be called with a `key` and `secret`');
    }

    this._setApiField('key', config.key);
    this._setApiField('secret', config.secret);
    this._setApiField('baseUrl', config.baseUrl);
    this._setApiField('basePath', config.basePath);
    this._setApiField('strictSsl', config.strictSsl);
    this._prepResources();

    console.log(this.campaign.create('a'));
  }

  /** 'Public' methods */


  _createClass(Classy, [{
    key: 'getApiField',
    value: function getApiField(key) {
      return this._api[key];
    }

    /** 'Private' methods */

  }, {
    key: '_setApiField',
    value: function _setApiField(key, value) {
      if (typeof value !== "undefined") {
        this._api[key] = value;
      }
    }
  }, {
    key: '_prepResources',
    value: function _prepResources() {
      for (var name in _resources.resources) {
        var resourceName = name[0].toLowerCase() + name.substring(1),
            resourceInstance = new _resources.resources[name](this);

        this[resourceName] = resourceInstance;
      }
    }
  }]);

  return Classy;
}();

exports.default = Classy;