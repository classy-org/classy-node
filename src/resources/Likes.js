import Resource from '../ClassyResource';

class Likes extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['del'],
      path: '/likes'
    });
  }
}

export default Likes;
