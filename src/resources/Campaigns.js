import Resource from '../ClassyResource';

class Campaigns extends Resource {
  constructor(Classy) {
    super(Classy);
    
    this.path = 'campaigns';

    this.retrieve = this.createMethod({
      method: "GET",
      path: '/campaigns/{campaignId}'
    });    
  }
}

export default Campaigns;
