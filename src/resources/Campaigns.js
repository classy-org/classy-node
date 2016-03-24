import Resource from '../ClassyResource';

class Campaigns extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['retrieve', 'update'],
      path: '/campaigns'
    });

    this.createFundraisingPage = this.createMethod({
      method: 'POST',
      path: '/{id}/fundraising-pages'
    });

    this.createFaq = this.createMethod({
      method: 'POST',
      path: '/{id}/faqs'
    });

    this.listFaqs = this.createMethod({
      method: 'GET',
      path: '/{id}/faqs'
    });
  }
}

export default Campaigns;
