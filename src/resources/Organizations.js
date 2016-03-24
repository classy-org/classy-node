import Resource from '../ClassyResource';

class Organizations extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['retrieve'],
      path: '/organizations'
    });

    this.createCampaign = this.createMethod({
      method: 'POST',
      path: '/{id}/campaigns'
    });

    this.retrieveCampaigns = this.createMethod({
      method: 'GET',
      path: '/{id}/campaigns'
    });
  }
}

export default Organizations;
