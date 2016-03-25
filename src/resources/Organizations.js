import Resource from '../ClassyResource';

class Organizations extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve'],
      lists: [
        'activity',
        'campaigns',
        'designations',
        'supporters',
        'recurring-donation-plans',
        'transactions',
        'designations',
        'engagement-settings'
      ],
      creates: [
        'designations',
        'campaigns'
      ],
      path: '/organizations'
    });

    /** Updates */
    this.updateEngagementSettings = this.createMethod({
      method: 'PUT',
      path: '/{id}/engagement-settings'
    });

  }
}

export default Organizations;
