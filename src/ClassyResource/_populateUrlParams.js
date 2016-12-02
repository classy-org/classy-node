import _ from 'lodash';

/**
 * Maps URL params from the spec to arguments
 * used in the actual resource call.
 *
 * @param  {array} params URL params from the spec
 * @param  {array} args   Arguments used in the resource call
 * @return {object}        A key/value mapping between params and args
 */
export default function _populateUrlParams(params, args) {
  const urlData = {};

  for (let i in params) {
    if (!_.isUndefined(args[i])) {
      urlData[params[i]] = args[i];
    }
  }

  return urlData;
}
