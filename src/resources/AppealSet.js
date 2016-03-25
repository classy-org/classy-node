import Resource from '../ClassyResource';

class AppealSet extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['retrieve', 'update'],
      path: '/appeal-set'
    });

  }
}

export default AppealSet;
