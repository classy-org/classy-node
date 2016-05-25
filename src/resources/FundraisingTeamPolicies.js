import Resource from '../ClassyResource';

class FundraisingTeamPolicies extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve', 'update'],
      path: '/fundraising-team-policies'
    });
  }
}

export default FundraisingTeamPolicies;
