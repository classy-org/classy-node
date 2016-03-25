import Resource from '../ClassyResource';

class Ecards extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve', 'update', 'del'],
      path: '/eCards'
    });

  }
}

export default Ecards;
