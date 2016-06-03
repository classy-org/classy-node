import Resource from '../ClassyResource';

class FeedItems extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve', 'update', 'del'],
      lists: [
        'comments',
        'likes'
      ],
      creates: ['comments', 'likes'],
      path: '/feed-items'
    });
  }
}

export default FeedItems;
