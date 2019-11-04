import request from 'request';
import requestDebug from 'request-debug';
import { utils } from '../utils';

export default class ClassyResource {
  constructor(Classy, urlData) {
    /** Public properties */
    this.basePath = urlData.basePath || Classy.basePath;
    this.baseUrl = Classy.baseUrl;
    this.path = utils.makeURLInterpolator(this.path || '');

    /** Private properties */
    this._classy = Classy;
    this._urlData = urlData;

    /** Request debug setting */
    if (this._classy.requestDebug) {
      requestDebug(request, (type, data, r) => {
        if (r.headers['x-no-log']) {
          return;
        } else {
          this._classy.requestDebugAction(type, data, r);
        }
      });
    }

    /** Set up Error Logger (if defined) */
    if (this._classy.errorLogger) {
      this._errorLogger = this._classy.errorLogger;
    }

    /** Add basic methods */
    if (urlData.basic) {
      this._addBasicMethods(urlData.basic);
    }

    /** Add list methods */
    if (urlData.lists) {
      this._addListMethods(urlData.lists);
    }

    /** Add retrieve methods */
    if (urlData.retrieves) {
      this._addRetrieveMethods(urlData.retrieves);
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

}

import _addBasicMethods from './_addBasicMethods';
import _addCreateMethods from './_addCreateMethods';
import _addCustomMethods from './_addCustomMethods';
import _addListMethods from './_addListMethods';
import _addRetrieveMethods from './_addRetrieveMethods';
import _chooseToken from './_chooseToken';
import _createFullPath from './_createFullPath';
import _generateAuthForm from './_generateAuthForm';
import _makeRequest from './_makeRequest';
import _populateUrlParams from './_populateUrlParams';
import _refreshAppToken from './_refreshAppToken';
import createMethod from './createMethod';

Object.assign(ClassyResource.prototype, {
  _addBasicMethods,
  _addCreateMethods,
  _addCustomMethods,
  _addListMethods,
  _addRetrieveMethods,
  _chooseToken,
  _createFullPath,
  _generateAuthForm,
  _makeRequest,
  _populateUrlParams,
  _refreshAppToken,
  createMethod
});
