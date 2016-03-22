import ClassyResource from '../ClassyResource';

class Campaign extends ClassyResource {
  constructor(Classy) {
    super(Classy);
    
    this.path = 'campaign';

    this.retrieve = this.createMethod({
      method: "GET",
      path: '/campaigns/{campaignId}'
    });    
  }
}

export default Campaign;
