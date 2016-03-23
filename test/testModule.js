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
    classy.organizations.createCampaign(34, {
      name: 'Node-SDK Campaign',
      goal: 3.50,
      type: "crowdfunding",
      started_at: '2016-03-23 07:00:00',
      timezone_identifier:"US/Central"
    }).then((response) => {
      
      classy.campaigns.update(response.id, {
        name: "Edited Node-SDK Campaign!"
      });
      
    });
    
  });

});
