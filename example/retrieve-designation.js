/** Just for testing */

import Classy from '../src/Classy/main';
import dotenv from 'dotenv';

dotenv.config();

const classy = new Classy({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  baseUrl: 'https://stagingapi.stayclassy.org',
  requestDebug: true
});

const app = classy.app();

// get app token, managed by classy-node
app.then((response) => {
  // app token used
  classy.campaigns.retrieveDesignation(508360, 67109, {
    token: 'app'
  });
});
