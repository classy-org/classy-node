import Resource from './ClassyResource';
import _ from 'lodash';
const resources = require('./resources.json');

module.exports = class Classy {
  constructor(config) {
    const DEFAULT_BASE_URL = 'https://api.classy.org';
    const DEFAULT_PATH = '2.0';
    const DEFAULT_STRICT_SSL = true;
    const DEFAULT_REQUEST_DEBUG = true;

    /** Handle errors */
    if (_.isUndefined(config)
    ||  (!_.isUndefined(config.headers)
        && (_.isUndefined(config.clientId) ||  _.isUndefined(config.clientSecret)))) {
      throw new Error('Classy needs to be called with a `clientId` and `clientSecret`');
    }

    this.appToken = null;
    this.ClassyResource = Resource;

    /** Set required params */
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;

    /** Override and replace headers if config.headers is set */
    this.headers = config.headers;

    /** Override defaults if asked */
    this.requestDebug = (
      !_.isUndefined(config.requestDebug) ?
      config.requestDebug :
      DEFAULT_REQUEST_DEBUG
    );

    this.basePath = (
      !_.isUndefined(config.basePath) ?
      config.basePath :
      DEFAULT_PATH
    );

    this.baseUrl = (
      !_.isUndefined(config.baseUrl) ?
      config.baseUrl :
      DEFAULT_BASE_URL
    );

    this.strictSsl = (
      !_.isUndefined(config.strictSsl) ?
      config.strictSsl :
      DEFAULT_STRICT_SSL
    );

    this._prepResources();
  }

  /**
   * Kick things off by getting an app token, setting it to this.appToken,
   * and starting a timeout for it to refresh.
   */
  app() {
    const _this = this;
    const promise = new Promise((resolve, reject) => {
      this.timeoutId = undefined;

      const timeout = () => {
        _this.timeoutId = setTimeout(tokenTicker, _.get(_this, 'appToken.expires_in', 0) * 900);
      };

      const tokenTicker = () => {
        this.getAppToken().then((response) => {
          clearTimeout(_this.timeoutId);

          this.setAppToken(response);
          resolve(response);

          timeout();
        }, (error) => {
          clearTimeout(_this.timeoutId);
          console.error('App token failure');
          reject(error);
        });
      };

      timeout();
    });

    return promise;
  }

  /** Basic app token request */
  getAppToken() {
    return this.oauth.auth({
      client_id: this.clientId,
      client_secret: this.clientSecret
    });
  }

  /** Set app token and then nullify on exiration */
  setAppToken(value) {
    if (_.get(value, 'expires_in', false)) {
      this.appToken = value;

      // Remove stored app token reference after expiration
      setTimeout(() => {
        this.appToken = null;
      }, this.appToken.expires_in * 1000);
    } else {
      throw new Error('Not a valid app token, cannot be set:', value);
    }
  }

  /** Add resource methods based on resources.json */
  _prepResources() {
    _.each(resources, (urlData, name) => {
      const resourceName = _.camelCase(name);
      const resourceInstance = new Resource(this, urlData);

      this[resourceName] = resourceInstance;
    });
  }
};
