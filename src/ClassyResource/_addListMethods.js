import _ from 'lodash';

/**
 * Adds list methods to the resource based on
 * the passed array. Lists are resources associated
 * with the called resource, e.g. campaigns.listFaqs(#)
 *
 * @param {array} lists A list of list methods to add
 */
export default function _addListMethods(lists) {
  const _this = this;

  _.each(lists, (method) => {
    const methodName = _.upperFirst(_.camelCase(method));

    _this['list' + methodName] = _this.createMethod({
      method: 'GET',
      path: '/{id}/' + method
    });
  });
}
