import Resource from '../ClassyResource';

class Organizations extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve'],
      lists: [
        'activity',
        'analytics',
        'campaigns',
        'designations',
        'engagement-settings',
        'designations',
        'recurring-donation-plans',
        'supporters',
        'transactions'
      ],
      creates: [
        'campaigns',
        'designations'
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
