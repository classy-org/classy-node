import requireDir from 'require-dir';
import _ from 'lodash';

const resourceFolders = requireDir('./resources');
const resources = _.mapValues(resourceFolders, (value) => value.default);

export default resources;
