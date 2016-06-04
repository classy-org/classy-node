import Resource from '../ClassyResource';

class FundraisingPages extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve', 'update', 'del'],
      lists: [
        'activity',
        'posts',
        'feed-items'
      ],
      creates: ['posts', 'feed-items', 'transfers'],
      path: '/fundraising-pages'
    });
  }
}

export default FundraisingPages;
