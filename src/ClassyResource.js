import {utils} from './utils';
import path from 'path';

export default class ClassyResource {
  constructor(Classy, urlData) {  
    /** Public properties */
    this.basePath = Classy.getApiField('basePath');
    this.path = utils.makeURLInterpolator(this.path || '');
    
    /** Private properties */
    this._classy = Classy;
    this._urlData = urlData;   
  }
  
  _createFullPath(commandPath, urlData) {
    return path.join(
      this.basePath,
      commandPath(urlData)
    ).replace(/\\/g, '/');
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
        
        /** Add required param error handling */
      }
      
      let requestPath = this._createFullPath(commandPath, urlData);
      
      return requestPath;
    }
  }
}
