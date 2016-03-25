import Resource from '../ClassyResource';

class Campaigns extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['retrieve', 'update'],
      path: '/campaigns'
    });

    /** Custom */
    this.publish = this.createMethod({
      method: 'POST',
      path: '/{id}/publish'
    });

    this.unpublish = this.createMethod({
      method: 'POST',
      path: '/{id}/unpublish'
    });

    this.deactivate = this.createMethod({
      method: 'POST',
      path: '/{id}/deactivate'
    });

    /** Lists */
    this.listActivity = this.createMethod({
      method: 'GET',
      path: '/{id}/activity'
    });

    this.listCredentialSets = this.createMethod({
      method: 'GET',
      path: '/{id}/credential-sets'
    });

    this.listEcards = this.createMethod({
      method: 'GET',
      path: '/{id}/ecards'
    });

    this.listFaqs = this.createMethod({
      method: 'GET',
      path: '/{id}/faqs'
    });

    this.listFundraisingTeams = this.createMethod({
      method: 'GET',
      path: '/{id}/fundraising-teams'
    });

    this.listQuestions = this.createMethod({
      method: 'GET',
      path: '/{id}/questions'
    });

    this.listRecurringDonationPlans = this.createMethod({
      method: 'GET',
      path: '/{id}/recurring-donation-plans'
    });

    this.listTransactions = this.createMethod({
      method: 'GET',
      path: '/{id}/transactions'
    });

    this.listTicketTypes = this.createMethod({
      method: 'GET',
      path: '/{id}/ticket-types'
    });

    /** Creates */
    this.createAppealSet = this.createMethod({
      method: 'POST',
      path: '/{id}/appeal-set'
    });

    this.createCredentialSet = this.createMethod({
      method: 'POST',
      path: '/{id}/credential-sets'
    });

    this.createEcard = this.createMethod({
      method: 'POST',
      path: '/{id}/ecards'
    });

    this.createFaq = this.createMethod({
      method: 'POST',
      path: '/{id}/faqs'
    });

    this.createQuestion = this.createMethod({
      method: 'POST',
      path: '/{id}/questions'
    });

    this.createTicketType = this.createMethod({
      method: 'POST',
      path: '/{id}/ticket-types'
    });

    this.createFundraisingPage = this.createMethod({
      method: 'POST',
      path: '/{id}/fundraising-pages'
    });

    this.createTransaction = this.createMethod({
      method: 'POST',
      path: '/{id}/transactions'
    });

    /** Retrieves */
    this.retrieveAppealSet = this.createMethod({
      method: 'GET',
      path: '/{id}/appeal-set'
    });

  }
}

export default Campaigns;
