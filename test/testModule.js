/** Just for testing */

import Classy from '../src/Classy';

let classy = new Classy({
  key: 'api_key',
  secret: 'api_secret',
  baseUrl: 'https://dev-gateway.classy-test.org'
});


classy.oauth.createAppToken({
  
}).then(function(response) {
  console.log(response);
}).catch(function(err) {
  console.log(err);
});
