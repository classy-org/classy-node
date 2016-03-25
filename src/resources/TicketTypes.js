import Resource from '../ClassyResource';

class TicketTypes extends Resource {
  constructor(Classy) {
    super(Classy, {
      includeBasic: ['retrieve', 'update'],
      path: '/ticket-types'
    });
  }
}

export default TicketTypes;
