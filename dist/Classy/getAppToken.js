"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAppToken;
/** Basic app token request */
function getAppToken() {
  return this.oauth.auth({
    client_id: this.clientId,
    client_secret: this.clientSecret
  });
}