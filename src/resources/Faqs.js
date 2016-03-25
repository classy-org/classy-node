import Resource from '../ClassyResource';

class Faqs extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve', 'del', 'update'],
      path: '/faqs'
    });
  }
}

export default Faqs;
