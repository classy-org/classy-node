import Resource from '../ClassyResource';

class RecurringDonationPlans extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve', 'update'],
      path: '/recurring-donation-plans'
    });

  }
}

export default RecurringDonationPlans;
