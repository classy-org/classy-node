import {utils} from './utils';

export default class ClassyResource {
  constructor(Classy, urlData) {  
    /** Public properties */
    this.basePath = utils.makeURLInterpolator(Classy.getApiField('basePath'));
    this.path = utils.makeURLInterpolator(this.path || '');
    
    /** Private properties */
    this._classy = Classy;
    this._urlData = urlData;
  }
  
  createUrlData() {
    for (let i in this._urlData) {
      if (this._urlData.hasOwnProperty(i)) {
        urlData[i] = this._urlData[i];
      }
    }
  }
}
