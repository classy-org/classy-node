import Resource from '../ClassyResource';

class Questions extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['update'],
      path: '/questions'
    });
  }
}

export default Questions;
