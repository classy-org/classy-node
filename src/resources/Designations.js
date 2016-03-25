import Resource from '../ClassyResource';

class Designations extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['update'],
      path: '/designations'
    });

  }
}

export default Designations;
