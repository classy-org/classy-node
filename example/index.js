/** Just for testing */

import Classy from '../src/Classy';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const classy = new Classy({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,

  // baseUrl: 'https://dev-gateway.classy-test.org',
  baseUrl: 'https://stagingapi.stayclassy.org',

  requestDebug: true
});
const app = classy.app();

app.then((response) => {

  console.log(
    colors.green('✓'),
    colors.gray('/oauth2/auth (app) - ' + response.access_token)
  );

  classy.oauth.auth({
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  }).then((response) => {

    console.log(
      colors.green('✓'),
      colors.gray('/oauth2/auth (member) - ' + response.access_token)
    );

    classy.transactions.createHardCreditTransfer(2733009, {
      to: {
        type: 'campaign',
        id: 56327
      },
      note: 'lmao'
    }).then((response) => {

    });

  });

});
