import Resource from '../ClassyResource';

class Comments extends Resource {
  constructor(Classy) {
    super(Classy, {
    	basic: ['retrieve', 'delete', 'update'],
    	lists: ['likes'],
      path: '/comments'
    });

  }
}

export default Comments;
