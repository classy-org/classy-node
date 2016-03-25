import Resource from '../ClassyResource';

class Questions extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['update'],
      path: '/questions'
    });
  }
}

export default Questions;
