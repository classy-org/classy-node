import _ from 'lodash';

/** Set app token and then nullify on exiration */
export default function setAppToken(value) {
  const _this = this;
  if (_.get(value, 'expires_in', false)) {
    _this.appToken = value;

    // Remove stored app token reference after expiration
    setTimeout(() => {
      _this.appToken = null;
    }, _this.appToken.expires_in * 1000);
  } else {
    throw new Error('Not a valid app token, cannot be set:', value);
  }
}
