import Resource from '../ClassyResource';

class Organizations extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['retrieve'],
      path: '/organizations'
    });

    /** Lists */
    this.listActivity = this.createMethod({
      method: 'GET',
      path: '/{id}/activity'
    });

    this.listCampaigns = this.createMethod({
      method: 'GET',
      path: '/{id}/campaigns'
    });

    this.listDesignations = this.createMethod({
      method: 'GET',
      path: '/{id}/designations'
    });

    this.listSupporters = this.createMethod({
      method: 'GET',
      path: '/{id}/supporters'
    });

    this.listRecurringDonationPlans = this.createMethod({
      method: 'GET',
      path: '/{id}/recurring-donation-plans'
    });

    this.listTransactions = this.createMethod({
      method: 'GET',
      path: '/{id}/transactions'
    });

    /** Creates */
    this.createDesignation = this.createMethod({
      method: 'POST',
      path: '/{id}/designations'
    });

    this.createCampaign = this.createMethod({
      method: 'POST',
      path: '/{id}/campaigns'
    });

    /** Retrieves */
    this.retrieveEngagementSettings = this.createMethod({
      method: 'GET',
      path: '/{id}/engagement-settings'
    });

    /** Updates */
    this.updateEngagementSettings = this.createMethod({
      method: 'PUT',
      path: '/{id}/engagement-settings'
    });

  }
}

export default Organizations;
