import {expect, assert} from 'chai';
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

      method('1').then(function (response) {
        expect(response.prop).to.be.true;
      });

    });

  });

  describe('_chooseToken', () => {
    it('should choose app token when forced', () => {

      const appToken = { token: 'app' };
      const memberToken = { token: 'member' };
      const tokenOpts = {
        member: memberToken,
        app: appToken,
        force: 'app'
      };
      const token = resource._chooseToken(tokenOpts);

      expect(token).to.equal(tokenOpts.app);

    });

    it('should choose member token when forced', () => {

      const appToken = { token: 'app' };
      const memberToken = { token: 'member' };
      const tokenOpts = {
        member: memberToken,
        app: appToken,
        force: 'member'
      };
      const token = resource._chooseToken(tokenOpts);

      expect(token).to.equal(tokenOpts.member);
    });

    it('should choose member token if it exists & nothing is forced', () => {
      const appToken = { token: 'app' };
      const memberToken = { token: 'member' };
      const tokenOpts = {
        member: memberToken,
        app: appToken,
      };

      const token = resource._chooseToken(tokenOpts);

      expect(token).to.equal(tokenOpts.member);
    });

    it('should choose `undefined` token when forced', () => {

      const appToken = { token: 'app' };
      const memberToken = { token: 'member' };
      const tokenOpts = {
        member: memberToken,
        app: appToken,
        force: 'random!'
      };
      const token = resource._chooseToken(tokenOpts);

      expect(token).to.be.undefined;

    });
  });

  describe('_generateAuthForm', () => {

    it('should generate an auth form from args', () => {
      const authForm = resource._generateAuthForm([{
        username: 'test',
        password: 'test'
      }]);

      expect(authForm.client_id).to.equal(resource._classy.clientId);
      expect(authForm.client_secret).to.equal(resource._classy.clientSecret);
      expect(authForm.grant_type).to.equal('password');
    });

  });

});
