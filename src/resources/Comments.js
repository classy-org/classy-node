import Resource from '../ClassyResource';

class Comments extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve', 'del', 'update'],
      lists: ['likes'],
      creates: ['likes'],
      path: '/comments'
    });
  }
}

export default Comments;
