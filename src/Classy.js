import resources from './resources';
import _ from 'lodash';

module.exports = class Classy {
  constructor(config) {
    const DEFAULT_BASE_URL = 'https://api.classy.org';
    const DEFAULT_PATH = '2.0';
    const DEFAULT_STRICT_SSL = true;

    if (_.isUndefined(config)
    ||  _.isUndefined(config.clientId)
    ||  _.isUndefined(config.clientSecret)) {
      throw new Error('Classy needs to be called with a `clientId` and `clientSecret`');
    }

    this.appToken = {};
    this.memberToken = {};

    // Set required params
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;

    // Override defaults if asked
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
    let _this = this;

    let promise = new Promise((resolve, reject) => {
      let timeoutId;
      let timeout = () => {
        timeoutId = setTimeout(getToken, _this.appToken.expiresIn);
      };

      // Make the actual token call
      let getToken = () => {
        _this.oauth.auth({
          client_id: _this.clientId,
          client_secret: _this.clientSecret
        }).then((response) => {
          // Loop timeout and resolve init promise
          clearTimeout(timeoutId);
          timeout();
          resolve(response);
        }).catch((error) => {
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

  setTokens(grantType, tokenResponse) {
    switch (grantType) {
      case 'client_credentials':
        this.appToken = {
          value: tokenResponse.access_token,
          expiresIn: tokenResponse.expires_in * 1000,
          expiresOn: new Date().getTime() + (tokenResponse.expires_in * 1000)
        };
        break;

      case 'refresh_token':
        this.memberToken = {
          value: tokenResponse.access_token,
          refreshToken: tokenResponse.refresh_token,
          expiresIn: tokenResponse.expires_in * 1000,
          expiresOn: new Date().getTime() + (tokenResponse.expires_in * 1000)
        };
        break;

      case 'password':
        this.memberToken = {
          value: tokenResponse.access_token,
          refreshToken: tokenResponse.refresh_token,
          expiresIn: tokenResponse.expires_in * 1000,
          expiresOn: new Date().getTime() + (tokenResponse.expires_in * 1000)
        };
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
