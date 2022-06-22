import _ from 'lodash';
import { utils } from '../utils';

/**
 * [createMethod description]
 * @param {Object} spec            Options for method, the current options are:
 *                                 method: HTTP Request verb
 *                                 path: Path that will be appended to the curent resource's path
 *                                 headers: Custom HTTP headers
 *                                 basePath: Override the current resource's bathPath
 *
 * @return {Function}              The resource method
 */
export default function createMethod(spec) {
  const PARAM_REGEX = /\{(.*?)\}/g;

  /** Get parameterized request URL and method */
  const specPath = (!_.isUndefined(spec.path) ? spec.path : '');
  const fullPath = this._urlData.path + specPath;
  const commandPath = utils.makeURLInterpolator(fullPath);
  const urlParams = utils.getRegexMatches(fullPath, PARAM_REGEX);
  const requestMethod = _.get(spec, 'method', 'GET').toUpperCase();

  /** Return resource method */
  return (...args) => {

    /** Extract data from function arguments */
    const urlData = this._populateUrlParams(urlParams, args);
    const data = utils.getDataFromArgs(args);

    /** Error if not all required params are satisfied */
    for (let i = 0; i < urlParams.length; i++) {
      const arg = args[0];
      const param = urlParams[i];

      if (!arg) {
        throw new Error(
          'Classy: Argument "' + param + '" required, but got: ' + arg +
          ' (on API request to ' + requestMethod + ' ' + commandPath(urlData) + ')'
        );
      }
    }

    /** Create full request path with resolved params */
    const resolvedPath = commandPath(urlData);
    const isAuthRequest = utils.isAuthRequest(resolvedPath);
    const requestPath = this._createFullPath(resolvedPath, isAuthRequest, spec.basePath);

    /** Populate form data for authorization requests */
    let form = false;
    if (isAuthRequest) {
      form = this._generateAuthForm(args);
    }

    /**
     * Token stuff & requests need to be synchronous with refresh
     */
    return this._chooseToken(form, data).then((response) => {
      const DEFAULT_REQUEST_HEADERS = {
        Accept: 'application/json'
      };

      let requestHeaders = this._classy.headers || _.merge(DEFAULT_REQUEST_HEADERS, spec.headers);
      this.baseUrl  = this._classy.baseUrl;

      if (requestMethod == 'POST'
        || requestMethod == 'PUT'
        || requestMethod == 'PATCH'
        && !isAuthRequest) {
        requestHeaders['Content-Type'] = 'application/json';
      }

      if (!response) {
        return this._makeRequest(requestPath, requestMethod, requestHeaders, form, data);
      }

      if (response === 'app') {
        return this._refreshAppToken().then((response) => {
          const appToken = _.get(this._classy.appToken, 'access_token', null);
          delete data.token;

          requestHeaders.Authorization = 'Bearer ' + appToken;

          return this._makeRequest(requestPath, requestMethod, requestHeaders, form, data);
        }, (error) => {
          console.error('App token refresh failed: ', error);
        });
      }

      if (response === 'member') {

        // This flags suggested that access token created from Okta and baseUrl should be Gateway URL like AWSGatewayUrl
        if (_.get(data, 'token.is_okta_token', false)) {
          this.baseUrl  = this._classy.oktaBaseUrl;
        }

        const memberToken = _.get(data, 'token.access_token', false);
        delete data.token;

        requestHeaders.Authorization = 'Bearer ' + memberToken;

        return this._makeRequest(requestPath, requestMethod, requestHeaders, form, data);
      }

    }, (error) => {
      throw new Error('No token defined. Expected memberToken object or `token: \'app\'`');
    });

  };
}
