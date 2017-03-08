import chai from 'chai';
import nock from 'nock';
import lolex from 'lolex';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Classy from '../src/Classy/main';
import resources from '../src/resources';
import _ from 'lodash';

chai.use(sinonChai);

const expect = chai.expect;
const assert = chai.assert;

describe('Classy', () => {

  it('should throw without clientId and clientSecret', () => {
    assert.throw(() => {
      new Classy();
    }, Error);
  });

  it('should throw without clientId', () => {
    assert.throw(() => {
      new Classy({
        headers: {},
        clientSecret: 'test'
      });
    }, Error);
  });

  it('should throw without clientSecret', () => {
    assert.throw(() => {
      new Classy({
        headers: {},
        clientId: 'test'
      });
    }, Error);
  });

  it('should create instance with key, secret, and defaults', () => {
    const classy = new Classy({
      clientId: 'client_id_str',
      clientSecret: 'client_secret_str'
    });

    expect(classy.clientId).to.equal('client_id_str');
    expect(classy.clientSecret).to.equal('client_secret_str');
    expect(classy.baseUrl).to.equal('https://api.classy.org');
    expect(classy.basePath).to.equal('2.0');
    expect(classy.strictSsl).to.equal(true);
  });

  it('should create instance and override defaults', () => {
    resources.Campaigns.basePath = 'newapi';
    resources.Messages.basePath  = 'anotherservice';
    const classy = new Classy({
      clientId: 'client_id_str',
      clientSecret: 'client_secret_str',
      baseUrl: 'https://dev-gateway.classy-test.org',
      basePath: 'eng',
      strictSsl: false
    });

    expect(classy.clientId).to.equal('client_id_str');
    expect(classy.clientSecret).to.equal('client_secret_str');
    expect(classy.baseUrl).to.equal('https://dev-gateway.classy-test.org');
    expect(classy.basePath).to.equal('eng');
    expect(classy.strictSsl).to.equal(false);

    _.each(resources, (value, key) => {
      const resourceName = _.camelCase(key);
      const expectedBaseUrl = key == 'Campaigns' ? 'newapi' : key == 'Messages' ? 'anotherservice' : 'eng';

      expect(classy[resourceName].basePath).to.equal(expectedBaseUrl);
    });
  });

  it('should create resource methods', () => {
    const classy = new Classy({
      clientId: 'client_id_str',
      clientSecret: 'client_secret_str'
    });

    _.each(resources, (value, key) => {
      const resourceName = _.camelCase(key);
      expect(classy).to.have.ownProperty(resourceName);
    });
  });

  it('should set clientId', () => {
    const classy = new Classy({
      clientId: 'client_id_str',
      clientSecret: 'client_secret_str'
    });

    expect(classy.clientId).to.equal('client_id_str');
  });

  it('should disable request debug', () => {
    const classy = new Classy({
      clientId: 'client_id_str',
      clientSecret: 'client_secret_str',
      requestDebug: false
    });

    expect(classy.requestDebug).to.be.false;
  });

  it('should default requestDebugAction to console.log', () => {
    let stub = sinon.stub(console, 'log');
    const classy = new Classy({
      clientId: 'client_id_str',
      clientSecret: 'client_secret_str'
    });
    classy.requestDebugAction(null, 'data');
    expect(stub).to.have.been.calledWith('data');
    console.log.restore();
  });

  describe('app', () => {

    it('should kick off the app token cycle', function() {
      return this.skip();

      const classy = new Classy({
        clientId: 'client_id_str',
        clientSecret: 'client_secret_str',
        requestDebug: false
      });

      const result = {
        token_type: 'bearer',
        access_token: 'c66aa4fb5bf14cfa8b4bf9eef0b825d5',
        expires_in: 1
      };
      const scope = nock('https://api.classy.org', {
        reqheaders: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).post('/oauth2/auth').reply(200, result);

      return classy.app().then(function (response) {
        expect(response).to.deep.equal(result);
      });
    });

    it('should error in the app token cycle', function() {
      return this.skip();
      
      const classy = new Classy({
        clientId: 'client_id_str',
        clientSecret: 'client_secret_str',
        requestDebug: false
      });
      const result = {};
      const scope = nock('https://api.classy.org', {
        reqheaders: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).post('/oauth2/auth').reply(404, result);

      return classy.app()
        .catch((error) => {
          expect(error).to.equal(result);
        });
    });
  });

  describe('setApptoken', () => {

    it('should set app token when asked', () => {
      const classy = new Classy({
        clientId: 'client_id_str',
        clientSecret: 'client_secret_str',
        requestDebug: false
      });
      const token = {
        expires_in: 10
      };
      classy.setAppToken(token);

      expect(classy.appToken).to.equal(token);

    });

    it('should expire app token after a bit', () => {
      const clock = lolex.install();
      const classy = new Classy({
        clientId: 'client_id_str',
        clientSecret: 'client_secret_str',
        requestDebug: false
      });
      const token = {
        expires_in: 10
      };
      classy.setAppToken(token);
      clock.tick(10001);

      expect(classy.appToken).to.equal(null);

      clock.uninstall();
    });
  });

});
