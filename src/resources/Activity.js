import Resource from '../ClassyResource';

class AppealSet extends Resource {
  constructor(Classy) {
    super(Classy, {
      creates: ['comments'],
      path: '/activity'
    });

  }
}

export default AppealSet;
