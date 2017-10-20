/** Just for testing */

import Classy from '../src/Classy/main';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const classy = new Classy({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  baseUrl: 'https://gateway.classy.loc',
  requestDebug: true
});

const app = classy.app();

// get app token, managed by classy-node
app.then((response) => {
  // app token used
  classy.organizations.retrieve(1, {
    token: 'app'
  });

  // member auth request, response stored by app, not classy-node
  classy.oauth.auth({
    code: 'VALID_AUTHORIZATION_CODE',
    token: 'app'
  }).then((response) => {
    // member token used
    classy.me.retrieve({
      token: response
    });
  });

});
