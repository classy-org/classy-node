import Resource from '../ClassyResource';

class Themes extends Resource {
  constructor(Classy) {
    super(Classy, {
      path: '/donation-matchers'
    });

    this.retrieve = this.createMethod({
      method: 'GET',
      path: ''
    });
  }
}

export default Themes;
