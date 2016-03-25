import Resource from '../ClassyResource';

class TicketTypes extends Resource {
  constructor(Classy) {
    super(Classy, {
      basic: ['retrieve', 'update'],
      path: '/ticket-types'
    });
  }
}

export default TicketTypes;
