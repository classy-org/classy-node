import {resources} from './resources';

export default class Classy {
  constructor(config) {
    this.DEFAULT_BASE_URL = 'https://api.classy.org';
    this.DEFAULT_PATH = '2.0';
    this.DEFAULT_STRICT_SSL = true;

    this.api = {
      baseUrl: this.DEFAULT_BASE_URL,
      basePath: this.DEFAULT_PATH,
      strictSsl: this.DEFAULT_STRICT_SSL
    };
    
    if (typeof config === "undefined"
    ||  typeof config.key === "undefined" 
    ||  typeof config.secret === "undefined") {
      throw new Error('Classy needs to be called with a `key` and `secret`');
    }
    
    this._setApiField('key', config.key);
    this._setApiField('secret', config.secret);
    this._setApiField('baseUrl', config.baseUrl);
    this._setApiField('basePath', config.basePath);
    this._setApiField('strictSsl', config.strictSsl);
    this._prepResources();
  }
  
  /** 'Public' methods */
  getApiField(key) {
    return this.api[key];
  }

  /** 'Private' methods */
  _setApiField(key, value) {
    if (typeof value !== "undefined") {
      this.api[key] = value;      
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
