import Resource from '../ClassyResource';

class Transactions extends Resource {
  constructor(Classy) {
    super(Classy, {
      path: '/transactions'
    });

    this.createDedication = this.createMethod({
      method: 'POST',
      path: '/{id}/dedications'
    });

  }
}

export default Transactions;
