import Resource from '../ClassyResource';

class Likes extends Resource {
  constructor(Classy) {
    super(Classy, {
			basic: ['delete'],
			path: '/likes'
    });

  }
}

export default Likes;
