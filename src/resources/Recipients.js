import Resource from '../ClassyResource';

class Recipients extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve', 'del'],
      path: '/recipients'
    });
  }
}

export default Recipients;
