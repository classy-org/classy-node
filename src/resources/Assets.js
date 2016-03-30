import Resource from '../ClassyResource';

class Assets extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve', 'update'],
      lists: ['children'],
      path: '/assets'
    });

    this.process = this.createMethod({
      method: 'POST',
      path: '/{id}/process'
    });

    this.url = this.createMethod({
      method: 'POST',
      path: '/url'
    });

  }
}

export default Assets;
