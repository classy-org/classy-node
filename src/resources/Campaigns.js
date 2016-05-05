import Resource from '../ClassyResource';

class Campaigns extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve', 'update'],
      lists: [
        'activity',
        'admins',
        'credential-sets',
        'donation-matching-plans',
        'ecards',
        'faqs',
        'fundraising-pages',
        'fundraising-teams',
        'messages',
        'posts',
        'questions',
        'recurring-donation-plans',
        'transactions',
        'ticket-types'
      ],
      creates: [
        'appeal-sets',
        'credential-sets',
        'donation-matching-plans',
        'ecards',
        'faqs',
        'fundraising-pages',
        'messages',
        'posts',
        'questions',
        'ticket-types',
        'transactions'
      ],
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

    /** Retrieves */
    this.retrieveAppealSet = this.createMethod({
      method: 'GET',
      path: '/{id}/appeal-set'
    });

    this.retrieveTheme = this.createMethod({
      method: 'GET',
      path: '/{id}/themes'
    });

    this.retrieveOverview = this.createMethod({
      method: 'GET',
      path: '/{id}/overview'
    });

    this.retrieveCustomUrl = this.createMethod({
      method: 'GET',
      path: '/{id}/customUrl'
    });

  }
}

export default Campaigns;
