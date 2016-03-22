import {utils} from './utils';
import path from 'path';
import request from 'request';
import requestDebug from 'request-debug';

requestDebug(request);

export default class ClassyResource {
  constructor(Classy, urlData) {  
    /** Public properties */
    this.basePath = Classy.getApiField('basePath');
    this.baseUrl = Classy.getApiField('baseUrl');
    this.path = utils.makeURLInterpolator(this.path || '');
    
    /** Private properties */
    this._classy = Classy;
    this._urlData = urlData;   
  }
  
  _createFullPath(oauth, commandPath, urlData) {
    var fullPath = path.join(
      oauth ? '' : this.basePath,
      commandPath(urlData)
    ).replace(/\\/g, '/');
    
    fullPath = path.normalize(fullPath);

    return fullPath;
  }
  
  _populateUrlParams(params, args) {
    let urlData = {};
    
    for (let i in params) {
      if (typeof args[i] !== "undefined") {
        urlData[params[i]] = args[i];
      }
    }

    return urlData;
  }
  
  createMethod(spec) {
    const OPTIONAL_REGEX = /^\?.*/g;
    const PARAM_REGEX = /\{(.*?)\}/g;

    let commandPath = utils.makeURLInterpolator(spec.path),
      requestMethod = (spec.method || 'GET').toUpperCase(),
      urlParams = utils.getRegexMatches(spec.path, PARAM_REGEX);
      
    return (...args) => {
      let self = this,
        urlData = this._populateUrlParams(urlParams, args);

      for (let i = 0; i < urlParams.length; i++) {
        let arg = args[0],
          param = urlParams[i],
          optional = OPTIONAL_REGEX.test(param);
        
        /** TODO: Add required param error handling */
      }
      
      let requestPath = this._createFullPath(spec.oauth, commandPath, urlData);

      return this._makeRequest(requestPath, requestMethod);
    }
  }
  
  _makeRequest(path, method) {
    let promise = new Promise((resolve, reject) => {
      let headers = {
        'Authorization': 'Bearer ' + '1482e68e53714b85a969d10cd8724b37',
        'Accept': 'application/json'
      };
      
      request({
        baseUrl: this.baseUrl,
        uri: path,
        method: method,
        json: true,
        headers: headers,
        rejectUnauthorized: false
      }, (err, response, body) => {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      });
      
    });
      
    return promise;
  }
}
