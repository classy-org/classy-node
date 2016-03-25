import Resource from '../ClassyResource';

class Transactions extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['retrieve', 'update'],
      path: '/transactions'
    });

    this.createDedication = this.createMethod({
      method: 'POST',
      path: '/{id}/dedications'
    });

  }
}

export default Transactions;
