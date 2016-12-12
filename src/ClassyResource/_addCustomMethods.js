import _ from 'lodash';

/**
 * [_addCustomMethods description]
 * @param {[type]} methods [description]
 */
export default function _addCustomMethods(methods) {
  const _this = this;

  _.each(methods, (params, methodName) => {
    _this[methodName] = _this.createMethod(params);
  });
}
