import Resource from '../ClassyResource';

class FundraisingPages extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve', 'update', 'del'],
      lists: [
      	'activity',
      	'posts'
      ],
      creates: ['posts'],
      path: '/fundraising-pages'
    });

  }
}

export default FundraisingPages;
