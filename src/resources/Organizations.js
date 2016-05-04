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
        'messages',
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

    this.updatePlanFeatures = this.createmethod({
      method: 'PUT',
      path: '{id}/plan-features'
    })

    /** Retrieves */
    this.retrieveMailchimpList = this.createMethod({
      method: 'GET',
      path: '/{id}/mailchimp-list'
    });

    this.retrieveMailchimpListCategory = this.createMethod({
      method: 'GET',
      path: '/{id}/mailchimp-list/{mailchimpListId}/mailchimp-category'
    });

    this.retrievePlanFeatures = this.createMethod({
      method: 'GET',
      path: '/{id}/plan-features'
    });

    this.retrieveSecuritySettings = this.createMethod({
      method: 'GET',
      path: '/{id}/security-settings'
    });

    /** Creates */
    this.createMailchimpAccount = this.createMethod({
      method: 'POST',
      path: '/{id}/mailchimp-account'
    });

  }
}

export default Organizations;
