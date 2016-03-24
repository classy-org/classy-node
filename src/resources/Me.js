import Resource from '../ClassyResource';

class Me extends Resource {
  constructor(Classy) {
    super(Classy, {
      path: '/me'
    });

    this.retrieve = this.createMethod({
      method: 'GET'
    });
  }
}

export default Me;
