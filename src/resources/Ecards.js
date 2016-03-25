import Resource from '../ClassyResource';

class Ecards extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['retrieve', 'update', 'del'],
      path: '/eCards'
    });

  }
}

export default Ecards;
