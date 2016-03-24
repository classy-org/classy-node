/** Just for testing */

import Classy from '../src/Classy';

let classy = new Classy({
  clientId: 'fbnwFsTgUox9VAPTsHfJXk5KiyScSU',
  clientSecret: 'XlX9sSH0sHHxTVIoBilbxcEYbQrrtLsYhtwNSrwuN0vgID0164xYY',
  baseUrl: 'https://dev-gateway.classy-test.org'
});

let app = classy.app();

app.then((response) => {

  classy.oauth.auth({
    username: 'mlingner@classy.org',
    password: 'classydev!'
  }).then((response) => {

    classy.fundraisingTeams.listFundraisingPages(52262);

  });

});
