import Resource from '../ClassyResource';

class FundraisingTeams extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['retrieve'],
      path: '/fundraising-teams'
    });

    /** Lists */
    this.listActivity = this.createMethod({
      method: 'GET',
      path: '/{id}/activity'
    });

    this.listFundraisingPages = this.createMethod({
      method: 'GET',
      path: '/{id}/fundraising-pages'
    });
  }
}

export default FundraisingTeams;
