import _ from 'lodash';

/**
 * Kick things off by getting an app token, setting it to this.appToken,
 * and starting a timeout for it to refresh.
 */
export default function app() {
  const _this = this;

  return new Promise((resolve, reject) => {
    this.timeoutId = undefined;

    const timeout = () => {
      _this.timeoutId = setTimeout(tokenTicker, _.get(_this, 'appToken.expires_in', 0) * 900);
    };

    function tokenTicker() {
      this.getAppToken().then((response) => {
        clearTimeout(_this.timeoutId);

        this.setAppToken(response);
        resolve(response);

        timeout();
      }, (error) => {
        clearTimeout(_this.timeoutId);
        console.error('App token failure');
        reject(error);
      });
    };

    timeout();
  });
}
