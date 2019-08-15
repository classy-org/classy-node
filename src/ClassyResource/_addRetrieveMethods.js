import _ from 'lodash';
const resources = require('../resources.json');
import { singular } from 'pluralize';

/**
 * Adds retrieve methods to the resource based on
 * the passed array. Retrieves are resources associated
 * with the called resource, and a child resource
 * e.g. campaigns.retrieveDesignations would resolve as
 * the api path: campaigns/{id}/designations/{designationsId}
 *
 * @param {array} retrieves A list of retrieve methods to add
 */
export default function _addRetrieveMethods(retrieves) {
  const _this = this;

  _.each(retrieves, (method) => {
    const methodName = _.upperFirst(_.camelCase(method));
    const methodIdName = _.camelCase(method);
    const resourceDefinition = resources[methodName];
    const singularMethodName = singular(methodName);

    _this['retrieve' + singularMethodName] = _this.createMethod({
      method: 'GET',
      path: `/{id}/${method}/{${methodIdName}Id}`,
      basePath: _.get(resourceDefinition, 'basePath')
    });
  });
}
