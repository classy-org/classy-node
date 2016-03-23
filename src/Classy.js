import resources from './resources';
import _ from 'lodash';

export default class Classy {
  constructor(config) {
    const DEFAULT_BASE_URL = 'https://api.classy.org';
    const DEFAULT_PATH = '2.0';
    const DEFAULT_STRICT_SSL = true;
    
    if (typeof config === "undefined"
    ||  typeof config.clientId === "undefined" 
    ||  typeof config.clientSecret === "undefined") {
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
    let self = this;
    
    let promise = new Promise((resolve, reject) => {
      let timeoutId;
      let timeout = () => {
        timeoutId = setTimeout(getToken, self.appToken.expiresIn);
      };
      
      // Make the actual token call
      let getToken = () => {
        self.oauth.auth({
          client_id: self.clientId,
          client_secret: self.clientSecret
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
      }
      
      // Start the timeout looping
      timeout();
    });
    
    return promise;
  }
  
  setTokens(grantType, tokenResponse) {
    switch (grantType) {
      case "client_credentials":
        this.appToken = {
          value: tokenResponse.access_token,
          expiresIn: tokenResponse.expires_in * 1000,
          expiresOn: new Date().getTime() + (tokenResponse.expires_in * 1000)
        };
        break;
      
      case "refresh_token":
        this.memberToken = {
          value: tokenResponse.access_token,
          refreshToken: tokenResponse.refresh_token,
          expiresIn: tokenResponse.expires_in * 1000,
          expiresOn: new Date().getTime() + (tokenResponse.expires_in * 1000)
        };
        break;
        
      case "password":
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
      const resourceName = name[0].toLowerCase() + name.substring(1),
        resourceInstance = new resources[name](this);
      
      this[resourceName] = resourceInstance;
    }
  }
}
