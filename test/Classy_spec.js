import {expect, assert} from 'chai';

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
    let classy = new Classy({
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
      let resourceName = _.camelCase(key);
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

  it('should set appToken', () => {
    const classy = new Classy({
      clientId: 'client_id_str',
      clientSecret: 'client_secret_str',
      requestDebug: false
    });

    let grant = 'client_credentials';
    let opts = {
      access_token: 'test',
      expires_in: 100
    };
    let token = classy.setTokens(grant, opts);

    expect(classy.appToken).to.not.be.empty;
    expect(classy.memberToken).to.be.empty;
  });

  it('should set appToken', () => {
    const classy = new Classy({
      clientId: 'client_id_str',
      clientSecret: 'client_secret_str',
      requestDebug: false
    });

    let grant = 'refresh_token';
    let opts = {
      access_token: 'test',
      expires_in: 100
    };
    let token = classy.setTokens(grant, opts);

    expect(classy.memberToken).to.not.be.empty;
    expect(classy.appToken).to.be.empty;
  });

  it('should set appToken', () => {
    const classy = new Classy({
      clientId: 'client_id_str',
      clientSecret: 'client_secret_str',
      requestDebug: false
    });

    let grant = 'password';
    let opts = {
      access_token: 'test',
      expires_in: 100
    };
    let token = classy.setTokens(grant, opts);

    expect(classy.memberToken).to.not.be.empty;
    expect(classy.appToken).to.be.empty;
  });

  it('should set memberToken when member_token is passed', () => {
    const classy = new Classy({
      clientId: 'client_id_str',
      clientSecret: 'client_secret_str',
      requestDebug: false
    });

    let opts = {
      access_token: 'test',
      expires_in: 100
    };

    let token = classy.setTokens('member_token', opts);

    expect(classy.memberToken).to.not.be.empty;
    expect(classy.appToken).to.be.empty;
  });

  it('should have default for setTokens', () => {
    const classy = new Classy({
      clientId: 'client_id_str',
      clientSecret: 'client_secret_str',
      requestDebug: false
    });

    let token = classy.setTokens();

    expect(classy.memberToken).to.be.empty;
    expect(classy.appToken).to.be.empty;
  });

});
