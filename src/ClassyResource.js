import {utils} from './utils';
import path from 'path';
import request from 'request';
import requestDebug from 'request-debug';
import _ from 'lodash';

requestDebug(request);

export default class ClassyResource {
  constructor(Classy, urlData) {
    /** Public properties */
    this.basePath = Classy.basePath;
    this.baseUrl = Classy.baseUrl;
    this.path = utils.makeURLInterpolator(this.path || '');

    /** Private properties */
    this._classy = Classy;
    this._urlData = urlData;
  }

  createMethod(spec) {
    const OPTIONAL_REGEX = /^\?.*/g;
    const PARAM_REGEX = /\{(.*?)\}/g;

    let commandPath = utils.makeURLInterpolator(spec.path),
      requestMethod = (spec.method || 'GET').toUpperCase(),
      urlParams = utils.getRegexMatches(spec.path, PARAM_REGEX);

    return (...args) => {
      let _this = this,
        urlData = this._populateUrlParams(urlParams, args),
        data = utils.getDataFromArgs(args);

      for (let i = 0; i < urlParams.length; i++) {
        let arg = args[0],
          param = urlParams[i],
          optional = OPTIONAL_REGEX.test(param);

        /** TODO: Add required param error handling */
      }

      let resolvedPath = commandPath(urlData);
      let isAuthRequest = utils.isAuthRequest(resolvedPath);

      //
      let requestPath = this._createFullPath(resolvedPath, isAuthRequest);

      // Choose token for Authorization header
      let token = this._chooseToken(
        this._classy.appToken,
        this._classy.memberToken,
        spec.useAppToken
      );

      // Merge default headers with spec headers
      let requestHeaders = {
        Authorization: 'Bearer ' + token.value,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };

      _.merge(requestHeaders, spec.headers);

      // Handle auth requests
      let form = false;
      if (isAuthRequest) {
        form = this._generateAuthForm(args);
      }

      // Make the request and return a promise
      return this._makeRequest(requestPath, requestMethod, requestHeaders, form, data);
    };
  }

  /**
   * Create a full path based on the populated
   * URI and the basePath defined when the Classy
   * instance was initialized. Returns something like
   * /2.0/campaigns/23456 or /oauth2/auth.
   *
   * @param  {string}  resolvedPath  The populated URI
   * @param  {Boolean} isAuthRequest Determines whether to append basePath
   * @return {string}                The full URI for the upcoming request
   */
  _createFullPath(resolvedPath, isAuthRequest) {
    let fullPath = path.join(
        isAuthRequest ? '' : this.basePath,
        resolvedPath
      ).replace(/\\/g, '/');

    fullPath = path.normalize(fullPath);

    return fullPath;
  }

  /**
   * Maps URL params from the spec to arguments
   * used in the actual resource call.
   *
   * @param  {array} params URL params from the spec
   * @param  {array} args   Arguments used in the resource call
   * @return {object}        A key/value mapping between params and args
   */
  _populateUrlParams(params, args) {
    let urlData = {};

    for (let i in params) {
      if (!_.isUndefined(args[i])) {
        urlData[params[i]] = args[i];
      }
    }

    return urlData;
  }

  /**
   * If there's no member token or if the endpoint
   * specifically asks to use the app token, use the
   * app token. Otherwise, use the member token.
   *
   * @param  {object} appToken    Application token
   * @param  {object} memberToken Member token
   * @param  {boolean} useAppToken Forces appToken token to win
   * @return {object}             The chosen token
   */
  _chooseToken(appToken, memberToken, useAppToken) {
    let token;

    if (!_.isEmpty(memberToken) && !useAppToken) {
      token = memberToken;
    } else {
      token = appToken;
    }

    return token;
  }

  /**
   * Handles authentication requests by adding
   * the appropriate x-www-form-urlencoded data
   * to the request. Camel cased keys will be
   * converted to snake case.
   *
   * @param  {array} args
   * @return {object}      A form object for the request
   */
  _generateAuthForm(args) {
    let form = _.mapKeys(args[0], (value, key) => _.snakeCase(key)),
      grantType = utils.generateOauthGrantType(args[0]);

    form.grant_type = grantType;
    form.client_id = this._classy.clientId;
    form.client_secret = this._classy.clientSecret;

    return form;
  }

  /**
   * Makes a request to Classy's API.
   *
   * @param  {string} path    Request URI
   * @param  {string} method  Request method
   * @param  {object} headers Request headers
   * @param  {object} form    Request form (optional)
   * @return {promise}         Promise based on API request
   */
  _makeRequest(path, method, headers, form, data) {
    let _this = this;
    let promise = new Promise((resolve, reject) => {
      let requestParams = {
        baseUrl: this.baseUrl,
        uri: path,
        method: method,
        headers: headers,
        rejectUnauthorized: false,
        form: form
      };

      if (method === 'GET') {
        requestParams.qs = data;
      } else {
        requestParams.body = JSON.stringify(data);
      }

      request(requestParams, (err, response, body) => {
        if (err) {
          reject(err);
        } else {
          body = JSON.parse(body);

          // Set tokens if it's a token request
          if (!_.isUndefined(form.grant_type)) {
            _this._classy.setTokens(form.grant_type, body);
          }

          resolve(body);
        }
      });

    });

    return promise;
  }
}
