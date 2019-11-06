import _ from 'lodash';
import request from 'request';

/**
 * Makes a request to Classy's API.
 *
 * @param  {string} path    Request URI
 * @param  {string} method  Request method
 * @param  {object} headers Request headers
 * @param  {object} form    Request form (optional)
 * @return {promise}         Promise based on API request
 */
export default function _makeRequest(path, method, headers = {}, form, data = {}) {
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
    baseUrl: this.baseUrl,
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
    try {
      requestParams.body = JSON.stringify(data);
    } catch (e) {
      /**
       * Pass the error to _errorLogger if defined
       */
      if (this._errorLogger) {
        this._errorLogger(e, {
          data,
          requestParams
        });

        throw e;
      }
    }
  }

  if (forceQs) {
    requestParams.qs = _.merge(requestParams.qs || {}, forceQs);
  }

  try {
    const promise = new Promise((resolve, reject) => {
      request(requestParams, (err, response, body) => {
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
              location: '_makeRequest.js',
              action: '_makeRequest - request()',
              originalError: err,
              response,
              body,
              requestParams
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
      });
    });

    return promise;
  } catch (e) {
    /**
     * Pass the error to _errorLogger if defined
     */
    if (this._errorLogger) {
      this._errorLogger(e, {
        location: '_makeRequest.js',
        action: '_makeRequest()',
        response: response,
        requestParams
      });
    }

    throw e;
  }
}
