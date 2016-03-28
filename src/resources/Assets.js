import Resource from '../ClassyResource';

class Assets extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve'],
      lists: ['children'],
      path: '/assets'
    });

  }
}

export default Assets;
