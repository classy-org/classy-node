/** Just for testing */

import Classy from '../src/Classy/main';
import dotenv from 'dotenv';
import { default as Bugsnag } from '@bugsnag/js';

dotenv.config();

let bugsnag = null;
let errorLogger = (error, other) => {
  console.log('An error occured', error, other);
};

if (process.env.BUGSNAG_API_KEY) {
  bugsnag = Bugsnag({
    apiKey: process.env.BUGSNAG_API_KEY
  });

  errorLogger = (error, other) => bugsnag.notify(error, { metaData: other });
}

const classy = new Classy({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  baseUrl: 'https://stagingapi.stayclassy.org',
  requestDebug: true,
  errorLogger: errorLogger
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
