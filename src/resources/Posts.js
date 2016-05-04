import Resource from '../ClassyResource';

class Posts extends Resource {
  constructor(Classy) {
    super(Classy, {
			basic: ['retrieve', 'delete', 'update'],
			creates: ['comments', 'likes'],
			lists: ['comments', 'likes'],
			path: '/posts'
    });
  }
}

export default Posts;
