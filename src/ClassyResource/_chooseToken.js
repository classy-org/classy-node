import _ from 'lodash';

/**
 * [_chooseToken description]
 * @param  {[type]} form [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export default function _chooseToken(form, data) {
  const dataToken = _.get(data, 'token', false);
  const clientCredentialsRequest = _.get(form, 'grant_type', false) === 'client_credentials';

  const promise = new Promise((resolve, reject) => {
    /** Unless it's a `client_credentials` request, pick a token */
    if (clientCredentialsRequest) {
      resolve(false);
    } else {
      if (!dataToken) {
        reject('No token defined. Expected memberToken object or `token: \'app\'`');
      } else if (dataToken === 'app') {
        resolve('app');
      } else {
        resolve('member');
      }

    }
  });

  return promise;
}
