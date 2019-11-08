# [Classy Node](https://www.npmjs.com/package/classy-node) [![Build Status](https://travis-ci.org/classy-org/classy-node.svg?branch=master)](https://travis-ci.org/classy-org/classy-node) [![Known Vulnerabilities](https://snyk.io/test/github/classy-org/classy-node/badge.svg)](https://snyk.io/test/github/classy-org/classy-node) [![Coverage Status](https://coveralls.io/repos/github/classy-org/classy-node/badge.svg?branch=master)](https://coveralls.io/github/classy-org/classy-node?branch=master)

Built for the creativity and flexibility of the world's most innovative minds, create impactful apps and integrations that make social enterprises more efficient and effective. Engineer the world for good with the Classy API.

Request access and learn more by visiting [developers.classy.org](https://developers.classy.org/overview/welcome).

## Docs

[View Full Documentation with Available Methods](https://classy-org.github.io/classy-node)

## Installation

`npm install classy-node`

## Overview

Start by instantiating your `classy` instance. We recommend storing your client ID and client secret as environment variables.

```
var Classy = require('classy-node');

var classy = new Classy({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});
```

Then, use `classy.app()` to obtain an application token and make calls as a trusted Classy application:

```
classy.app().then(function() {
  // Make calls on behalf of the application
});
```

Every resource method returns a promise:
```
classy.campaigns.retrieve(19, {
  token: 'app'
}).then(function(response) {
  // Do something with the response
}).catch(function(error) {
  // Do something with the error
});
```

Each resource can contain several basic methods (retrieve, update, delete). Each resource might also include additional custom methods that act upon related resources or perform specialized operations:

- `create()`
- `retrieve()`
- `update()`
- `del()`
- `create{RelatedResource}()` e.g., `createCampaign()`
- `list{RelatedResources}()` e.g. `listCampaigns()`
- `retrieve{RelatedResource}(parentId, resourceId)` e.g. `campaigns.retrieveDesignation()`
- Other/specialized e.g., `publish()`, `unpublish()`, & `deactivate()`

## Running examples

- install babel-node if you don't have it in your environment
- run `cp .env.example .env` and fill in the necessary env vars
- in the console, run: `babel-node example/filename.js`

## Using errorLogger (w/bugsnag)

We've added the ability to specify an errorLogger when instantiating Classy Node so that more specific information surrounding errors can be passed back to the clients and used.

This is different from requestDebug in that it will expose data related to errors on requests as well as from Classy Node in addition to other various information (where the error occured, params passed in to the failing method, etc.).

NOTE:

Error data returned has the potential to contain sensitive data. We attempt to provide the data in a non-JSONified manner whenever possible to aid with the omitting or filtering of sensitive information based on object keys (commonly access_key, secret_key, etc.) if you're using a third party or non-secure means for storing error logs.

```
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
  baseUrl: process.env.BASE_URL,
  requestDebug: true,
  errorLogger: errorLogger
});
```

## Contributing

When submitting a pull request, please make sure you've written [good commit messages](http://chris.beams.io/posts/git-commit/) that include references to issues and clearly describe what the commit achieves. Use the commit body to explain what you did and why you did it. Thanks!

You can run our tests with `npm test` and get coverage reports with `npm run coverage`.

You can run the example with `babel-node example/index.js`. Make sure you have your environment variables for `CLIENT_ID` and `CLIENT_SECRET` set up!


## More information

Classy Node was built by the developers at [Classy](https://classy.org) in San Diego, CA. We're on a mission to mobilize and empower the world for good.

The code was heavily inspired by Stripe's awesome [stripe-node](https://github.com/stripe/stripe-node).
