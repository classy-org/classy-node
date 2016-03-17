import ClassyResource from '../ClassyResource';

class Campaign extends ClassyResource {
  constructor(Classy) {
    super(Classy);
    
    this.path = 'campaign';

    this.create = this.createMethod({
      method: "POST",
      path: '/campaigns/{campaignId}/{test}'
    });    
  }
}

export default Campaign;
