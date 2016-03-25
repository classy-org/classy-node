import Resource from '../ClassyResource';

class AppealSet extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve', 'update'],
      path: '/appeal-set'
    });

  }
}

export default AppealSet;
