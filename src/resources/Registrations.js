import Resource from '../ClassyResource';

class Registrations extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['retrieve', 'update'],
      path: '/registrations'
    });

  }
}

export default Registrations;
