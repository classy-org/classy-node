import Resource from '../ClassyResource/main';
import _ from 'lodash';

class Classy {
  constructor(config) {
    const DEFAULT_BASE_URL = 'https://api.classy.org';
    const DEFAULT_PATH = '2.0';
    const DEFAULT_STRICT_SSL = true;
    const DEFAULT_REQUEST_DEBUG = true;
    const DEFAULT_REQUEST_DEBUG_ACTION = (type, data) => console.log(data);

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

    this.requestDebugAction = (
      !_.isUndefined(config.onRequestDebug) ?
      config.onRequestDebug :
      DEFAULT_REQUEST_DEBUG_ACTION
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

    // This is Gatewayurl to support Okta token. In case of Okta token, all api calls using member token should 
    // go from Gateway url 
    this.gatewayUrl = (
      !_.isUndefined(config.gatewayUrl) ?
      config.gatewayUrl :
      ''
    );

    /**
     * Add the ability to define an error logger.
     *
     * This differs from requestDebug in that it will log all errors that
     * occur within classy-node (related to the request or not).
     */
    if (config.errorLogger) {
      this.errorLogger = config.errorLogger;
    }

    this._prepResources();
  }
};

import _prepResources from './_prepResources';
import app from './app';
import getAppToken from './getAppToken';
import setAppToken from './setAppToken';

Object.assign(Classy.prototype, {
  _prepResources,
  app,
  getAppToken,
  setAppToken
});

module.exports = Classy;
