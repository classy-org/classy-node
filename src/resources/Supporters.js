import Resource from '../ClassyResource';

class Supporters extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['retrieve'],
      path: '/supporters'
    });
  }
}

export default Supporters;
