import Resource from '../ClassyResource';

class Themes extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['create', 'retrieve', 'update'],
      path: '/themes'
    });
  }
}

export default Themes;
