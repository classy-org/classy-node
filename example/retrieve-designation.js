/** Just for testing */

import Classy from '../src/Classy/main';
import dotenv from 'dotenv';

dotenv.config();

async function run() {

  const classy = new Classy({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    baseUrl: 'https://stagingapi.stayclassy.org',
    requestDebug: false
  });

  await classy.app();

  try {
    const response = await classy.campaigns.retrieveDesignation(511733, 124789, { token: 'app' });
    console.log(response);
  } catch (err) {
    console.error(err);
  }

  process.exit();
}

run();
