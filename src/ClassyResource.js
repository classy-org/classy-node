import {utils} from './utils';
import path from 'path';
import request from 'request';
import requestDebug from 'request-debug';
import _ from 'lodash';
import basicMethods from './basicMethods';

export default class ClassyResource {
  constructor(Classy, urlData) {
    /** Public properties */
    this.basePath = Classy.basePath;
    this.baseUrl = Classy.baseUrl;
    this.path = utils.makeURLInterpolator(this.path || '');

    /** Private properties */
    this._classy = Classy;
    this._urlData = urlData;

    /** Request debug setting */
    if (this._classy.requestDebug) {
      requestDebug(request);
    }

    /** Add basic methods */
    if (urlData.basic) {
      this._addBasicMethods(urlData.basic);
    }

    /** Add list methods */
    if (urlData.lists) {
      this._addListMethods(urlData.lists);
    }

    /** Add create methods */
    if (urlData.creates) {
      this._addCreateMethods(urlData.creates);
    }
  }

  createMethod(spec) {
    const OPTIONAL_REGEX = /^\?.*/g;
    const PARAM_REGEX = /\{(.*?)\}/g;

    /** Get parameterized request URL and method */
    const specPath = (!_.isUndefined(spec.path) ? spec.path : '');
    const fullPath = this._urlData.path + specPath;
    const commandPath = utils.makeURLInterpolator(fullPath);
    const urlParams = utils.getRegexMatches(fullPath, PARAM_REGEX);
    const requestMethod = (spec.method || 'GET').toUpperCase();

    /** Return resource method */
    return (...args) => {

      /** Extract data from function arguments */
      const _this = this;
      const urlData = this._populateUrlParams(urlParams, args);
      const data = utils.getDataFromArgs(args);

      /** Match params to function arguments */
      for (let i = 0; i < urlParams.length; i++) {
        const arg = args[0];
        const param = urlParams[i];
        const optional = OPTIONAL_REGEX.test(param);

        /** Error if not all required params are satisfied */
        if (!arg) {
          throw new Error(
            'Classy: Argument "' + urlParams[i] + '" required, but got: ' + arg +
            ' (on API request to ' + requestMethod + ' ' + commandPath(urlData) + ')'
          );
        }
      }

      /** Create resolved request path */
      const resolvedPath = commandPath(urlData);
      const isAuthRequest = utils.isAuthRequest(resolvedPath);
      const requestPath = this._createFullPath(resolvedPath, isAuthRequest);

      /** Choose token for Authorization header */
      const forceToken = spec.token
        || (!_.isUndefined(data) ? data.token : false);

      /** Set token for Authorization header */
      const token = this._chooseToken({
        app: this._classy.appToken,
        member: this._classy.memberToken,
        force: forceToken
      });

      /** Merge default headers with spec headers */
      const DEFAULT_REQUEST_HEADERS = {
        Authorization: 'Bearer ' + token.value,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };

      const requestHeaders = _.merge(DEFAULT_REQUEST_HEADERS, spec.headers);

      /** Handle auth requests */
      let form = false;
      if (isAuthRequest) {
        form = this._generateAuthForm(args);
      }

      /** Make the request and return a promise */
      return this._makeRequest(requestPath, requestMethod, requestHeaders, form, data);
    };
  }

  /**
   * Adds basic methods to the resource based on
   * the passed array.
   *
   * @param {array} basics A list of basic methods to add
   */
  _addBasicMethods(basics) {
    const _this = this;
    _.each(basics, (method) => {
      _this[method] = _this.createMethod(basicMethods[method]);
    });
  }

  /**
   * Adds list methods to the resource based on
   * the passed array. Lists are resources associated
   * with the called resource, e.g. campaigns.listFaqs(#)
   *
   * @param {array} lists A list of list methods to add
   */
  _addListMethods(lists) {
    const _this = this;

    _.each(lists, (method) => {
      const methodName = _.upperFirst(_.camelCase(method));

      _this['list' + methodName] = _this.createMethod({
        method: 'GET',
        path: '/{id}/' + method
      });
    });
  }

  /**
   * Adds list methods to the resource based on
   * the passed array. Lists are resources associated
   * with the called resource, e.g. campaigns.listFaqs(#)
   *
   * @param {array} lists A list of list methods to add
   */
  _addCreateMethods(lists) {
    const _this = this;

    _.each(lists, (method) => {
      const uppercaseMethod = _.upperFirst(_.camelCase(method));
      const methodName = uppercaseMethod.substr(0, uppercaseMethod.length - 1);

      _this['create' + methodName] = _this.createMethod({
        method: 'POST',
        path: '/{id}/' + method
      });
    });
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
    const fullPath = path.join(
        isAuthRequest ? '' : this.basePath,
        resolvedPath
      ).replace(/\\/g, '/');

    const normalizedPath = path.normalize(fullPath);

    return normalizedPath;
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
    const urlData = {};

    for (let i in params) {
      if (!_.isUndefined(args[i])) {
        urlData[params[i]] = args[i];
      }
    }

    return urlData;
  }

  /**
   * If the spec or param data forces a token, use that token.
   * If not, use the member token when it's available and the
   * app token when it's not.
   *
   * @param  {object} options    Tokens {app, member, force}
   * @return {object}             The chosen token
   */
  _chooseToken(options) {
    let token;

    if (options.force) {
      token = options[options.force];
    } else if (!_.isEmpty(options.member)) {
      token = options.member;
    } else {
      token = options.app;
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
    const form = _.mapKeys(args[0], (value, key) => _.snakeCase(key));
    const grantType = utils.generateOauthGrantType(args[0]);

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
    const _this = this;
    const promise = new Promise((resolve, reject) => {
      const requestParams = {
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
        if (err || !/^2/.test('' + response.statusCode)) {
          reject(err ? JSON.parse(err) : JSON.parse(body));
        } else {
          body = JSON.parse(body);

          /** Set tokens if it's a token request */
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
