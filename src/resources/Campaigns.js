import Resource from '../ClassyResource';

class Campaigns extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve', 'update'],
      lists: [
        'activity',
        'credential-sets',
        'ecards',
        'faqs',
        'fundraising-teams',
        'questions',
        'recurring-donation-plans',
        'transactions',
        'ticket-types'
      ],
      creates: [
        'appeal-sets',
        'credential-sets',
        'ecards',
        'faqs',
        'questions',
        'ticket-types',
        'fundraising-pages',
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

    /** Retrieves */
    this.retrieveAppealSet = this.createMethod({
      method: 'GET',
      path: '/{id}/appeal-set'
    });

    this.retrieveTheme = this.createMethod({
      method: 'GET',
      path: '/{id}/themes'
    });

  }
}

export default Campaigns;
