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

    this.listCampaigns = this.createMethod({
      method: 'GET',
      path: '/{id}/campaigns'
    });

    this.listDesignations = this.createMethod({
      method: 'GET',
      path: '/{id}/designations'
    });

    this.createDesignation = this.createMethod({
      method: 'POST',
      path: '/{id}/designations'
    });

    this.listSupporters = this.createMethod({
      method: 'GET',
      path: '/{id}/supporters'
    });

    this.listTransactions = this.createMethod({
      method: 'GET',
      path: '/{id}/transactions'
    });

  }
}

export default Organizations;
