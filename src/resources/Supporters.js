import Resource from '../ClassyResource';

class Supporters extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve'],
      path: '/supporters'
    });
  }
}

export default Supporters;
