import {expect, assert} from 'chai';
import nock from 'nock';

import Classy from '../src/Classy';
import ClassyResource from '../src/ClassyResource';
import resources from '../src/resources';
import _ from 'lodash';

describe('ClassyResource', () => {
  let classy;

  beforeEach(() => {
    classy = new Classy({
      clientId: 'client_id_str',
      clientSecret: 'client_secret_str',
      requestDebug: false
    });
  });

  describe('createMethod', () => {

    it('should fail without required params', () => {
      const resource = new ClassyResource(classy, {
        path: '/test'
      });

      const method = resource.createMethod({
        path: '/{id}/test'
      });

      assert.throw(() => {
        method();
      }, Error);
    });

    it('should hit correct URL when called', () => {

      const resource = new ClassyResource(classy, {
        path: '/test'
      });

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

    it('should choose app token when forced', () => {

      const resource = new ClassyResource(classy, {
        path: '/test'
      });
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

      const resource = new ClassyResource(classy, {
        path: '/test'
      });
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

    it('should choose `undefined` token when forced', () => {

      const resource = new ClassyResource(classy, {
        path: '/test'
      });
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

});
