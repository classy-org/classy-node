import { expect, assert } from 'chai';
import nock from 'nock';

import Classy from '../src/Classy';
import ClassyResource from '../src/ClassyResource';
import resources from '../src/resources';
import _ from 'lodash';

describe('ClassyResource', () => {
  let classy,
    resource;

  beforeEach(() => {
    classy = new Classy({
      clientId: 'client_id_str',
      clientSecret: 'client_secret_str',
      requestDebug: false
    });

    resource = new ClassyResource(classy, {
      path: '/test'
    });
  });

  describe('createMethod', () => {

    it('should fail without required params', () => {

      const method = resource.createMethod({
        path: '/{id}/test'
      });

      assert.throw(() => {
        method();
      }, Error);
    });

    it('should hit correct URL when called', () => {

      const method = resource.createMethod({
        method: 'GET',
        path: '/{id}/test'
      });
      const result = { prop: true };
      const scope = nock('https://api.classy.org')
        .get('/2.0/test/1/test')
        .reply(200, result);

      method('1').then((response) => {
        expect(response.prop).to.be.true;
      });

    });

    it('should hit correct URL when called without params', () => {

      const method = resource.createMethod({
        method: 'GET',
        path: '/test'
      });
      const result = { prop: true };
      const scope = nock('https://api.classy.org')
        .get('/2.0/test')
        .reply(200, result);

      method().then((response) => {
        expect(response.prop).to.be.true;
      });

    });

    it('should not include ?token=* in request params', () => {

      const method = resource.createMethod({
        method: 'GET',
        path: '/test'
      });
      const result = { prop: true };
      const scope = nock('https://api.classy.org')
        .get('/2.0/test?test=test')
        .reply(200, result);

      method({
        token: 'app',
        test: 'test'
      }).then((response) => {
        expect(response.prop).to.be.true;
      });

    });

    it('should hit auth URLs', () => {

      const authResource = new ClassyResource(classy, {
        path: '/oauth2'
      });
      const method = authResource.createMethod({
        method: 'POST',
        path: '/auth'
      });
      const result = { prop: true };
      const scope = nock('https://api.classy.org', {
        reqheaders: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).post('/oauth2/auth').reply(200, result);

      method({
        refresh_token: 'refresh_test'
      }).then((response) => {
        expect(response.prop).to.be.true;
      });

    });

    it('should handle non-200 responses as errors', () => {

      const method = resource.createMethod({
        method: 'GET',
        path: '/test'
      });
      const result = { prop: true };
      const scope = nock('https://api.classy.org')
        .get('/2.0/test/test')
        .reply(404);

      method().then((response) => {}, (error) => {
        expect(error.prop).to.be.true;
      });

    });

    it('should handle response errors', () => {

      const method = resource.createMethod({
        method: 'GET',
        path: '/test'
      });
      const result = { prop: true };
      const scope = nock('https://api.classy.org')
        .get('/2.0/test/test')
        .replyWithError({ test: 'oh no!' });

      method().then((response) => {}, (error) => {
        expect(error.test).to.equal('oh no!');
      });

    });

  });

  describe('_createFullPath', () => {
    it('should not add version param to auth requests', () => {
      const fullPath = resource._createFullPath('/test/1', true);

      expect(fullPath).to.equal('/test/1');
    });

    it('should add version param to non-auth requests', () => {
      const fullPath = resource._createFullPath('/test/1', false);

      expect(fullPath).to.equal('2.0/test/1');
    });
  });

  describe('_chooseToken', () => {
    it('should choose app token when forced', () => {
      const form = {};
      const data = { token: 'app' };
      const token = resource._chooseToken(form, data);

      token.then((response) => {
        expect(response).to.equal('app');
      });
    });

    it('should choose member token when forced', () => {
      const form = {};
      const data = { token: 'member' };
      const token = resource._chooseToken(form, data);

      token.then((response) => {
        expect(response).to.equal('member');
      });
    });

    it('should error if no token is defined', () => {
      const form = {};
      const data = {};
      const token = resource._chooseToken(form, data);

      token.then((response) => {}, (error) => {
        expect(error).to.equal('No token defined. Expected memberToken object or `token: \'app\'`');
      });
    });

    it('should resolve to false for client_credentials requets', () => {
      const form = { grant_type: 'client_credentials' };
      const data = {};
      const token = resource._chooseToken(form, data);

      token.then((response) => {
        expect(response).toBeFalsy();
      });
    });

  });

  describe('_generateAuthForm', () => {

    it('should generate an auth form from username args', () => {
      const authForm = resource._generateAuthForm([{
        username: 'test',
        password: 'test'
      }]);

      expect(authForm.grant_type).to.equal('password');
    });

    it('should generate an auth form from refresh args', () => {
      const authForm = resource._generateAuthForm([{
        refreshToken: 'test'
      }]);

      expect(authForm.refresh_token).to.equal('test');
    });

    it('should generate a facebook form from refresh args', () => {
      const authForm = resource._generateAuthForm([{
        '3rdClientId': 'test'
      }]);

      expect(authForm['3rd_client_id']).to.equal('test');
    });

  });

});
