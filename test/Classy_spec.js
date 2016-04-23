import {expect, assert} from 'chai';
import nock from 'nock';
import lolex from 'lolex';

import Classy from '../src/Classy';
import resources from '../src/resources';
import _ from 'lodash';

describe('Classy', () => {

  it('should throw without clientId and clientSecret', () => {
    assert.throw(() => {
      new Classy();
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

  describe('app', () => {

    it('should kick off the app token cycle', () => {
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
      }).post('/oauth2/auth').reply(200, {
        token_type: 'bearer',
        access_token: 'c66aa4fb5bf14cfa8b4bf9eef0b825d5',
        expires_in: 0
      });

      classy.app().then(function (response) {
        expect(response).to.equal(result);
      });
    });

    it('should error in the app token cycle', () => {
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

      classy.app().then(
        (response) => {},

        (error) => {
          expect(error).to.equal(result);
        }
      );
    });
  });

  describe('setTokens', () => {
    it('should set app token with client_credentials method', () => {
      const classy = new Classy({
        clientId: 'client_id_str',
        clientSecret: 'client_secret_str',
        requestDebug: false
      });

      const grant = 'client_credentials';
      const opts = {
        access_token: 'test',
        expires_in: 100
      };
      const token = classy.setTokens(grant, opts);

      expect(classy.appToken).to.not.be.empty;
      expect(classy.memberToken).to.be.empty;
    });

    it('should set member token with refresh_token method', () => {
      const classy = new Classy({
        clientId: 'client_id_str',
        clientSecret: 'client_secret_str',
        requestDebug: false
      });

      const grant = 'refresh_token';
      const opts = {
        access_token: 'test',
        expires_in: 100
      };
      const token = classy.setTokens(grant, opts);

      expect(classy.memberToken).to.not.be.empty;
      expect(classy.appToken).to.be.empty;
    });

    it('should set member token with password method', () => {
      const classy = new Classy({
        clientId: 'client_id_str',
        clientSecret: 'client_secret_str',
        requestDebug: false
      });
      const grant = 'password';
      const opts = {
        access_token: 'test',
        expires_in: 100
      };
      const token = classy.setTokens(grant, opts);

      expect(classy.memberToken).to.not.be.empty;
      expect(classy.appToken).to.be.empty;
    });

    it('should set member token when member_token is passed', () => {
      const classy = new Classy({
        clientId: 'client_id_str',
        clientSecret: 'client_secret_str',
        requestDebug: false
      });

      const opts = {
        access_token: 'test',
        expires_in: 100
      };

      const token = classy.setTokens('member_token', opts);

      expect(classy.memberToken).to.not.be.empty;
      expect(classy.appToken).to.be.empty;
    });

    it('should have default for setTokens', () => {
      const classy = new Classy({
        clientId: 'client_id_str',
        clientSecret: 'client_secret_str',
        requestDebug: false
      });

      const token = classy.setTokens();

      expect(classy.memberToken).to.be.empty;
      expect(classy.appToken).to.be.empty;
    });

    it('should have default for setTokens member_token', () => {
      const classy = new Classy({
        clientId: 'client_id_str',
        clientSecret: 'client_secret_str',
        requestDebug: false
      });

      const token = classy.setTokens('member_token');

      expect(classy.memberToken).to.be.empty;
      expect(classy.appToken).to.be.empty;
    });

    it('should have default for setTokens password', () => {
      const classy = new Classy({
        clientId: 'client_id_str',
        clientSecret: 'client_secret_str',
        requestDebug: false
      });

      const token = classy.setTokens('password');

      expect(classy.memberToken).to.be.empty;
      expect(classy.appToken).to.be.empty;
    });
  });

});
