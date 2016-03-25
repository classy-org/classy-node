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
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  }).then((response) => {
    console.log(classy);
    classy.organizations.createCampaign(34, {
      name: 'test'
    });

  });

});
