import Resource from '../ClassyResource';

class Oauth extends Resource {
  constructor(Classy) {
    super(Classy, {
      path: '/ping'
    });

    this.commence = this.createMethod({
      method: 'GET',
      path: ''
    });
  }
}

export default Oauth;
