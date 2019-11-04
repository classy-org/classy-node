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
           * If bugsnag is defined then report the error
           */
          if (this._bugsnag && this._bugsnag.notify) {
            this._bugsnag.notify(error, {
              metaData: {
                location: '_refreshAppToken.js',
                action: '_refreshAppToken() - getAppToken()'
              }
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
     * Bugsnag the error if bugsnag is defined
     */
    if (this._bugsnag && this._bugsnag.notify) {
      this._bugsnag.notify(e, {
        metaData: {
          location: '_refreshAppToken.js',
          action: '_refreshAppToken()'
        }
      });
    }

    throw e;
  }
}
