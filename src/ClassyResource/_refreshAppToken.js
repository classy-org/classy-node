/**
 * If this._classy.appToken exists, just resolve,
 * if not, refresh and then resolve.
 * @return {[type]} [description]
 */
export default function _refreshAppToken() {
  const promise = new Promise((resolve, reject) => {
    if (!this._classy.appToken) {
      this._classy.getAppToken().then((response) => {
        this._classy.setAppToken(response);
        resolve(response);
      }, (error) => {
        reject(error);
      });
    } else {
      resolve(this._classy.appToken);
    }
  });

  return promise;
}
