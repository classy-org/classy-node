import _ from 'lodash';
import Resource from '../ClassyResource/main';
const resources = require('../resources.json');

/** Add resource methods based on resources.json */
export default function _prepResources() {
  _.each(resources, (urlData, name) => {
    const resourceName = _.camelCase(name);
    const resourceInstance = new Resource(this, urlData);

    this[resourceName] = resourceInstance;
  });
}
