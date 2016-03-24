import Resource from '../ClassyResource';

class Oauth extends Resource {
  constructor(Classy) {
    super(Classy);

    this.auth = this.createMethod({
      method: 'POST',
      path: '/oauth2/auth',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
}

export default Oauth;
