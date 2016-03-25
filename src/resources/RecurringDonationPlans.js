import Resource from '../ClassyResource';

class RecurringDonationPlans extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['retrieve', 'update'],
      path: '/recurring-donation-plans'
    });

  }
}

export default RecurringDonationPlans;
