/**
 * If this._classy.appToken exists, just resolve,
 * if not, refresh and then resolve.
 * @return {[type]} [description]
 */
export default function _refreshAppToken() {
  try {
    const promise = new Promise((resolve, reject) => {
      if (!this._classy.appToken) {
        this._classy.getAppToken().then((response) => {
          this._classy.setAppToken(response);

          resolve(response);
        }, (error) => {
          /**
           * Pass the error to _errorLogger if defined
           */
          if (this._errorLogger) {
            this._errorLogger(error, {
              location: '_refreshAppToken.js',
              action: '_refreshAppToken() - getAppToken()'
            });
          }

          reject(error);
        });
      } else {
        resolve(this._classy.appToken);
      }
    });

    return promise;
  } catch (e) {
   /**
     * Pass the error to _errorLogger if defined
     */
    if (this._errorLogger) {
      this._errorLogger(e, {
        location: '_refreshAppToken.js',
        action: '_refreshAppToken()'
      });
    }

    throw e;
  }
}
