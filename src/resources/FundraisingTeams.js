import Resource from '../ClassyResource';

class FundraisingTeams extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve'],
      lists: ['activity', 'fundraising-pages'],
      path: '/fundraising-teams'
    });

  }
}

export default FundraisingTeams;
