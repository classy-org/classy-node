import Resource from '../ClassyResource';

class Dedications extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve', 'update'],
      path: '/dedications'
    });

  }
}

export default Dedications;
