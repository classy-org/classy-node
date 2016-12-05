import _ from 'lodash';
import basicMethods from '../basicMethods';

/**
 * Adds basic methods to the resource based on
 * the passed array.
 *
 * @param {array} basics A list of basic methods to add
 */
export default function _addBasicMethods(basics) {
  const _this = this;
  _.each(basics, (method) => {
    _this[method] = _this.createMethod(basicMethods[method]);
  });
}
