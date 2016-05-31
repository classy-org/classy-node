import Resource from './ClassyResource';
import resources from './resources';
import _ from 'lodash';

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

    this.appToken = {};
    this.memberToken = {};
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
   * Initialize the Classy instance with an application token.
   * Resolve promise once the first application token is generated.
   * Get new application token as soon as the current one expires.
   */
  app() {
    const _this = this;
    const promise = new Promise((resolve, reject) => {
      _this.timeoutId = undefined;

      const timeout = () => {
        _this.timeoutId = setTimeout(getToken, _this.appToken.expiresIn);
      };

      /** Make the actual token call */
      const getToken = () => {
        _this.oauth.auth({
          client_id: _this.clientId,
          client_secret: _this.clientSecret
        }).then((response) => {
          /** Loop timeout and resolve init promise */
          clearTimeout(_this.timeoutId);
          timeout();
          resolve(response);
        }, (error) => {
          /** Clear timeout and reject init promise */
          clearTimeout(_this.timeoutId);
          reject(error);
        });
      };

      /** Start the timeout looping */
      timeout();
    });

    return promise;
  }

  setTokens(grantType, token) {

    switch (grantType) {
      case 'client_credentials':
        this.appToken = {
          value: token.access_token,
          expiresIn: token.expires_in * 1000,
          expiresOn: new Date().getTime() + (token.expires_in * 1000)
        };
        break;

      case 'refresh_token':
        this.memberToken = {
          value: token.access_token,
          refreshToken: token.refresh_token,
          expiresIn: token.expires_in * 1000,
          expiresOn: new Date().getTime() + (token.expires_in * 1000)
        };
        break;

      case 'password':
        if (_.isUndefined(token)) {
          this.memberToken = {};
        } else {
          this.memberToken = {
            value: token.access_token,
            refreshToken: token.refresh_token,
            expiresIn: token.expires_in * 1000,
            expiresOn: new Date().getTime() + (token.expires_in * 1000)
          };
        }

        break;

      case 'member_token':
        if (_.isUndefined(token)) {
          this.memberToken = {};
        } else {
          this.memberToken = {
            value: token.access_token,
            refreshToken: token.refresh_token,
            expiresIn: token.expires_in * 1000,
            expiresOn: new Date().getTime() + (token.expires_in * 1000)
          };
        }

        break;

      default:
        break;
    }
  }

  _prepResources() {
    for (let name in resources) {
      const resourceName = _.camelCase(name),
        resourceInstance = new resources[name](this);

      this[resourceName] = resourceInstance;
    }
  }
};
