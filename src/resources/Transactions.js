import Resource from '../ClassyResource';

class Transactions extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['retrieve', 'update'],
      path: '/transactions'
    });

    /** Lists */
    this.listRegistrations = this.createMethod({
      method: 'GET',
      path: '/{id}/registrations'
    });

    /** Creates */
    this.createDedication = this.createMethod({
      method: 'POST',
      path: '/{id}/dedications'
    });

    /** Retrieves */
    this.retrieveItems = this.createMethod({
      method: 'GET',
      path: '/{id}/items'
    });

  }
}

export default Transactions;
