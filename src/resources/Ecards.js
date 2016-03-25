import Resource from '../ClassyResource';

class Ecards extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['retrieve', 'update', 'delete'],
      path: '/eCards'
    });

  }
}

export default Ecards;
