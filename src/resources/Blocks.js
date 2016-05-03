import Resource from '../ClassyResource';

class Blocks extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['create', 'retrieve', 'update'],
      path: '/blocks'
    });
  }
}

export default Blocks;
