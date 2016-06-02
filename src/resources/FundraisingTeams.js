import Resource from '../ClassyResource';

class FundraisingTeams extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve', 'del', 'update'],
      lists: [
        'activity',
        'fundraising-pages',
        'posts',
        'feed-items'
      ],
      creates: ['posts', 'fundraising-pages'],
      path: '/fundraising-teams'
    });

  }
}

export default FundraisingTeams;
