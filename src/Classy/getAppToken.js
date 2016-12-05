/** Basic app token request */
export default function getAppToken() {
  return this.oauth.auth({
    client_id: this.clientId,
    client_secret: this.clientSecret
  });
}
