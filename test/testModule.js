/** Just for testing */

import Classy from '../src/Classy';
import dotenv from 'dotenv';

dotenv.config();

let classy = new Classy({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  baseUrl: 'https://dev-gateway.classy-test.org'
});

let app = classy.app();

app.then((response) => {

  classy.oauth.auth({
    username: 'mlingner@classy.org',
    password: 'classydev!'
  }).then((response) => {

    classy.campaigns.createTicketType(54432, {
      "description": "Ticket Type description",
      "ended_at": "'2015",
      "entries_per_ticket": 3,
      "is_active": true,
      "is_classy_mode": false,
      "max_per_transaction": 1,
      "min_per_transaction": 2,
      "name": "General Admission",
      "price": 10,
      "quantity_available": 2,
      "started_at": "2016-03-03 01:39:35",
      "weight": 1
    });

  });

});
