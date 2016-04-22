/** Just for testing */

import Classy from '../src/Classy';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const classy = new Classy({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  baseUrl: 'https://stagingapi.stayclassy.org',
});
const app = classy.app();

app.then((response) => {

  console.log(
    colors.green('✓'),
    colors.gray('/oauth2/auth (app) - ' + response.access_token)
  );

  classy.organizations.listCampaigns(26820, {
    token: 'member'
  }).then(
    (response) => {
      const campaigns = response.data.map((data) => data.name + '#' + data.id);

      console.log(
        colors.green('✓'),
        colors.gray('List: /organizations/26820/campaigns - ' + campaigns)
      );
    },

    (error) => {
      console.log(
        colors.red('✗'),
        colors.gray('List: /organizations/26820/campaigns - ' + error.error)
      );
    }
  );

  classy.oauth.auth({
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  }).then((response) => {

    console.log(
      colors.green('✓'),
      colors.gray('/oauth2/auth (member) - ' + response.access_token)
    );

    /** Retrieve */
    classy.me.retrieve(59359).then((response) => {

      console.log(
        colors.green('✓'),
        colors.gray('Retrieve: /me - ' + response.first_name + ' ' + response.last_name)
      );
    });

    classy.transactions.retrieve(2741758).then((response) => {
      console.log(
        colors.green('✓'),
        colors.gray('Retrieve: /transactions/2741758 - $' + response.total_gross_amount)
      );

    });

    /** Create */
    classy.organizations.createCampaign(34, {
      name: 'Demo Day Campaign',
      goal: 500,
      started_at: '2017-10-15 01:00:00',
      timezone_identifier: 'US/Alaska',
      type: 'crowdfunding'
    }).then((response) => {

      console.log(
        colors.green('✓'),
        colors.gray(
          'Create: /organizations/34/campaigns - ' + response.name
          + '#' + response.id
        )
      );
    });

    /** Update */
    classy.campaigns.update(59676, {
      name: 'Matt\'s Demo Day Campaign'
    }).then((response) => {
      console.log(
        colors.green('✓'),
        colors.gray(
          'Update: /campaigns/59676 - ' + response.name + '#' + response.id
        )
      );
    });

    /** List */
    classy.organizations.listCampaigns(26820, {
      token: 'app'
    }).then((response) => {
      const campaigns = response.data.map((data) => data.name + '#' + data.id);

      console.log(
        colors.green('✓'),
        colors.gray('List: /organizations/26820/campaigns - ' + campaigns)
      );
    });

    /** Error */
    classy.organizations.retrieve(900000000).then(
      (response) => {},

      (error) => {
        console.log(
          colors.red('✗'),
          colors.gray('Retrieve: /organizations/900000000 - ' + error.error)
        );
      }
    );
  });

});
