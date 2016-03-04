import {utils} from './utils';

export default class ClassyMethod {
  constructor(spec) {
    var urlParams = spec.urlParams,
      requestMethod = (spec.method || 'GET').toUpperCase(),
      commandPath = typeof spec.path === 'function' ? spec.path :
      utils.makeURLInterpolator(spec.path || '');

    return () => {
      console.log([].slice.call(arguments), ',');
    }
  }


}
