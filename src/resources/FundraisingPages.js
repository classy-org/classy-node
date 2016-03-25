import Resource from '../ClassyResource';

class FundraisingPages extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['retrieve', 'update', 'del'],
      path: '/fundraising-pages'
    });

    /** Lists */
    this.listActivity = this.createMethod({
      method: 'GET',
      path: '/{id}/activity'
    });

    /** Creates */
  }
}

export default FundraisingPages;
