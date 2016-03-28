import Resource from '../ClassyResource';

class PolicyCheck extends Resource {
  constructor(Classy) {
    super(Classy, {
      path: '/policy-check'
    });

    this.campaignAdmin = this.createMethod({
      method: 'GET',
      path: '/campaign/{id}/admin'
    });
  }
}

export default PolicyCheck;
