import _ from 'lodash';
import { utils } from '../utils';

/**
 * Handles authentication requests by adding
 * the appropriate x-www-form-urlencoded data
 * to the request. Camel cased keys will be
 * converted to snake case.
 *
 * @param  {array} args
 * @return {object}      A form object for the request
 */
export default function _generateAuthForm(args) {
  const form = _.mapKeys(
    args[0],
    (value, key) => _.snakeCase(key).replace(/(\d)_/g, '$1')
  );
  const grantType = utils.generateOauthGrantType(args[0]);

  form.grant_type = grantType;
  form.client_id = form.client_id || this._classy.clientId;
  form.client_secret = form.client_secret || this._classy.clientSecret;

  return form;
}
