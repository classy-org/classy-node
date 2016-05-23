import Resource from '../ClassyResource';

class FundraisingTeams extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve', 'del', 'update'],
      lists: [
        'activity',
        'fundraising-pages',
        'posts'
      ],
      creates: ['posts'],
      path: '/fundraising-teams'
    });

  }
}

export default FundraisingTeams;
