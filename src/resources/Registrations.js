import Resource from '../ClassyResource';

class Registrations extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve', 'update'],
      path: '/registrations'
    });

  }
}

export default Registrations;
