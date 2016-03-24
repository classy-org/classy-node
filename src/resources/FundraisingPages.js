import Resource from '../ClassyResource';

class FundraisingPages extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['retrieve', 'update', 'del'],
      path: '/fundraising-pages'
    });
  }
}

export default FundraisingPages;
