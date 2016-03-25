import Resource from '../ClassyResource';

class Members extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve'],
      lists: ['organizations'],
      path: '/members'
    });

  }
}

export default Members;
