import { utils } from './utils';
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

    /** Add custom methods */
    if (urlData.custom && urlData.custom.methods) {
      this._addCustomMethods(urlData.custom.methods);
    }
  }

  createMethod(spec) {
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
      const _this = this;
      const urlData = this._populateUrlParams(urlParams, args);
      const data = utils.getDataFromArgs(args);

      /** Error if not all required params are satisfied */
      for (let i = 0; i < urlParams.length; i++) {
        const arg = args[0];
        const param = urlParams[i];

        if (!arg) {
          throw new Error(
            'Classy: Argument "' + urlParams[i] + '" required, but got: ' + arg +
            ' (on API request to ' + requestMethod + ' ' + commandPath(urlData) + ')'
          );
        }
      }

      /** Create full request path with resolved params */
      const resolvedPath = commandPath(urlData);
      const isAuthRequest = utils.isAuthRequest(resolvedPath);
      const requestPath = this._createFullPath(resolvedPath, isAuthRequest);

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
          Accept: 'application/json',
          'Content-Type': 'application/json'
        };
        let requestHeaders = this._classy.headers || _.merge(DEFAULT_REQUEST_HEADERS, spec.headers);

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

  /**
   *
   */
  _chooseToken(form, data) {
    const dataToken = _.get(data, 'token', false);
    const clientCredentialsRequest = _.get(form, 'grant_type', false) === 'client_credentials';

    const promise = new Promise((resolve, reject) => {
      /** Unless it's a `client_credentials` request, pick a token */
      if (clientCredentialsRequest) {
        resolve(false);
      } else {
        if (!dataToken) {
          reject('No token defined. Expected memberToken object or `token: \'app\'`');
        } else if (dataToken === 'app') {
          resolve('app');
        } else {
          resolve('member');
        }

      }
    });

    return promise;
  }

  /**
   * If this._classy.appToken exists, just resolve,
   * if not, refresh and then resolve.
   * @return {[type]} [description]
   */
  _refreshAppToken() {
    const promise = new Promise((resolve, reject) => {
      if (!this._classy.appToken) {
        this._classy.getAppToken().then((response) => {
          this._classy.setAppToken(response);
          resolve(response);
        }, (error) => {
          reject(error);
        });
      } else {
        resolve(this._classy.appToken);
      }
    });

    return promise;
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

  _addCustomMethods(methods) {
    const _this = this;

    _.each(methods, (params, methodName) => {
      _this[methodName] = _this.createMethod(params);
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
   * Handles authentication requests by adding
   * the appropriate x-www-form-urlencoded data
   * to the request. Camel cased keys will be
   * converted to snake case.
   *
   * @param  {array} args
   * @return {object}      A form object for the request
   */
  _generateAuthForm(args) {
    const form = _.mapKeys(
      args[0],
      (value, key) => _.snakeCase(key).replace(/(\d)_/g, '$1')
    );
    const grantType = utils.generateOauthGrantType(args[0]);

    form.grant_type = grantType;
    form.client_id = form.client_id || this._classy.clientId;
    form.client_secret = form.client_secret || this._classy.clientSecret;

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
          let error;
          if (err && err instanceof Error) {
            error = err;
          } else if (err && !(err instanceof Error)) {
            error = new Error(err);
          } else {
            error = new Error(JSON.stringify(response));
          }

          reject(error);
        } else {
          body = JSON.parse(body);
          resolve(body);
        }
      });

    });

    return promise;
  }
}
