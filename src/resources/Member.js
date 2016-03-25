import Resource from '../ClassyResource';

class Members extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['retrieve'],
      path: '/members'
    });

    /** Lists */
    this.listOrganizations = this.createMethod({
      method: 'GET',
      path: '/{id}/organizations'
    });
  }
}

export default Members;
