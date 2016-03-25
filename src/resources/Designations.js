import Resource from '../ClassyResource';

class Designations extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['update'],
      path: '/designations'
    });

  }
}

export default Designations;
