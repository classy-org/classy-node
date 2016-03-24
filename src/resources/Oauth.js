import Resource from '../ClassyResource';

class Oauth extends Resource {
  constructor(Classy) {
    super(Classy, {
      path: '/oauth2'
    });

    this.auth = this.createMethod({
      method: 'POST',
      path: '/auth',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
}

export default Oauth;
