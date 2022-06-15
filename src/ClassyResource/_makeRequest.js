import _ from 'lodash';
import request from 'request';

import { utils } from '../utils';

/**
 * Makes a request to Classy's API.
 *
 * @param  {string} path    Request URI
 * @param  {string} method  Request method
 * @param  {object} headers Request headers
 * @param  {object} form    Request form (optional)
 * @return {promise}         Promise based on API request
 */
export default function _makeRequest(path, method, headers = {}, form, data = {}, baseUrl = null) {
  let forceQs = null;

  if (data.noLog) {
    headers['x-no-log'] = true;
    delete data.noLog;
  }

  if (_.isObject(data.qs)) {
    forceQs = data.qs;
    delete data.qs;
  }

  // the encoding param defaults to undefined, which means the response will be stringified
  // we want to preserve the binary encoding for pdfs, so return null in this case
  const encoding = _.includes(headers.Accept, 'pdf')
    ? null
    : undefined;

  const requestParams = {
    baseUrl: baseUrl ? baseUrl : this.baseUrl,
    uri: path,
    method: method,
    headers: headers,
    rejectUnauthorized: false,
    form: form,
    encoding: encoding
  };

  if (method === 'GET') {
    requestParams.qs = data;
  } else {
    requestParams.body = JSON.stringify(data);
  }

  if (forceQs) {
    requestParams.qs = _.merge(requestParams.qs || {}, forceQs);
  }

  const promise = new Promise((resolve, reject) => {
    request(requestParams, (err, response, body) => {
      try {
        if (err || !/^2/.test('' + response.statusCode)) {
          let error;

          if (err && err instanceof Error) {
            error = err;
          } else if (err && !(err instanceof Error)) {
            const errorString = JSON.stringify(err);

            error = new Error(errorString);
          } else {
            const errorString = body ? JSON.stringify(body) : 'Non-200 response';

            error = new Error(errorString);
            error.statusCode = response ? response.statusCode : undefined;
          }

          /**
           * Pass the error to _errorLogger if defined
           */
          if (this._errorLogger) {
            this._errorLogger(error, {
              originalError: err,
              params: {
                path,
                method,
                headers,
                form,
                data
              },
              /**
               * We omit the body from the returned response
               * since it's JSONified.
               *
               * In-order to make it easier for clients to filter out sensitive
               * data we include the body as a non-JSONified object.
               */
              response: utils.jsonParseChildren(response, ['body'])
            });
          }

          reject(error);
        } else {
          // if we're not returning a pdf file, parse body
          if (!_.includes(response.headers['content-type'], 'pdf')) {
            body = body ? JSON.parse(body) : {};
          }

          resolve(body);
        }
      } catch (e) {
        /**
         * Pass the error to _errorLogger if defined
         */
        if (this._errorLogger) {
          this._errorLogger(e, {
            originalError: err,
            params: {
              path,
              method,
              headers,
              form,
              data
            },
            /**
             * We omit the body from the returned response
             * since it's JSONified.
             *
             * In-order to make it easier for clients to filter out sensitive
             * data we include the body as a non-JSONified object.
             */
            response: utils.jsonParseChildren(response, ['body'])
          });
        }

        reject(e);
      }
    });
  });

  return promise;
}
