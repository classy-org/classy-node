import Resource from '../ClassyResource';

class Campaigns extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['retrieve', 'update'],
      path: '/campaigns'
    });

    this.createFundraisingPage = this.createMethod({
      method: 'POST',
      path: '/{id}/fundraising-pages'
    });
  }
}

export default Campaigns;
