import Resource from '../ClassyResource';

class Organizations extends Resource {
  constructor(Classy) {
    super(Classy);

    this.createCampaign = this.createMethod({
      method: "POST",
      path: '/organizations/{organizationId}/campaigns'
    });
    
    this.retrieveCampaign = this.createMethod({
      method: "GET",
      path: '/organizations/{organizationId}/campaigns'
    });
  }
}

export default Organizations;
