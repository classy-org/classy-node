import Resource from '../ClassyResource';

class Questions extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['update', 'del'],
      path: '/questions'
    });
  }
}

export default Questions;
