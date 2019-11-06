import chai from 'chai';
import nock from 'nock';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Classy from '../src/Classy/main';
import ClassyResource from '../src/ClassyResource/main';

chai.use(sinonChai);
const expect = chai.expect;
const assert = chai.assert;

describe('ClassyResource', () => {
  let classy;
  let resource;

  let errorLoggerStub = sinon.stub();
  let onRequestDebugStub = sinon.stub();

  beforeEach(() => {
    errorLoggerStub.reset();
    onRequestDebugStub.reset();

    classy = new Classy({
      clientId: 'client_id_str',
      clientSecret: 'client_secret_str',
      requestDebug: true,
      onRequestDebug: onRequestDebugStub,
      errorLogger: errorLoggerStub
    });

    resource = new ClassyResource(classy, {
      path: '/test'
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

    nock('https://api.classy.org', {
      reqheaders: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).post('/oauth2/auth').reply(200, result);

    return method({
      refresh_token: 'refresh_test'
    }).then((response) => {
      expect(response.prop).to.be.true;
    });
  });

  describe('createMethod', () => {
    let app;

    beforeEach(() => {
      app = nock('https://api.classy.org')
        .persist()
        .post('/oauth2/auth')
        .reply(200, { expires_in: 10 });
    });

    afterEach(() => {
      app.persist(false);
    });

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

      nock('https://api.classy.org')
        .get('/2.0/test/1/test')
        .reply(200, result);

      return method('1', { token: 'app' }).then((response) => {
        expect(response.prop).to.be.true;
        expect(errorLoggerStub).to.not.have.been.called;
      });
    });

    it('should hit correct URL using custom basePath when called', () => {
      const method = resource.createMethod({
        method: 'GET',
        path: '/{id}/test',
        basePath: '3.0'
      });

      const result = { prop: true };

      nock('https://api.classy.org')
        .get('/3.0/test/1/test')
        .reply(200, result);

      return method('1', { token: 'app' }).then((response) => {
        expect(response.prop).to.be.true;
        expect(errorLoggerStub).to.not.have.been.called;
      });
    });

    it('should hit correct URL when called without params', () => {
      const method = resource.createMethod({
        method: 'GET',
        path: '/subtest'
      });

      const result = { prop: true };

      nock('https://api.classy.org')
        .get('/2.0/test/subtest')
        .reply(200, result);

      return method({ token: 'app' }).then((response) => {
        expect(response.prop).to.be.true;
        expect(errorLoggerStub).to.not.have.been.called;
      });
    });

    it('should not include ?token=* in request params', () => {
      const method = resource.createMethod({
        method: 'GET',
        path: '/subtest'
      });

      const result = { prop: true };

      nock('https://api.classy.org')
        .get('/2.0/test/subtest?test=test')
        .reply(200, result);

      return method({
        token: 'app',
        test: 'test'
      }).then((response) => {
        expect(response.prop).to.be.true;
        expect(errorLoggerStub).to.not.have.been.called;
      });

    });

    it('should handle non-200 responses as errors', () => {
      nock('https://api.classy.org')
        .persist()
        .post('/oauth2/auth')
        .reply(200, { expires_in: 10 });

      const method = resource.createMethod({
        method: 'GET',
        path: '/test'
      });

      nock('https://api.classy.org')
        .get('/2.0/test/test')
        .reply(404);

      return method({ token: 'app' })
        .then((response) => false, (error) => true)
        .then((val) => expect(val).to.be.true);

    });

    it('should handle response errors', () => {
      const method = resource.createMethod({
        method: 'GET',
        path: '/test'
      });

      nock('https://api.classy.org')
        .get('/2.0/test/test')
        .replyWithError({ test: 'oh no!' });

      return method({ token: 'app' })
        .catch((error) => {
          expect(error.message).to.equal('{"test":"oh no!"}');
          expect(errorLoggerStub).to.have.been.called;
        });
    });

    it('should use the provided debugging function and errorLogger on error', function() {
      const method = resource.createMethod({
        method: 'GET',
        path: '/test'
      });

      nock('https://api.classy.org')
        .get('/2.0/test/test')
        .replyWithError({ test: 'oh no, an error!' });

      return method({ token: 'app' }).catch(() => {
        expect(onRequestDebugStub).to.have.been.called;
        expect(errorLoggerStub).to.have.been.called;
      });
    });

    it('should use the provided debugging function and not errorLogger on success', function() {
      const method = resource.createMethod({
        method: 'GET',
        path: '/test'
      });

      const result = { prop: true };

      nock('https://api.classy.org')
        .get('/2.0/test/test')
        .reply(200, result);

      return method({ token: 'app' }).catch(() => {
        expect(onRequestDebugStub).to.have.been.called;
        expect(errorLoggerStub).to.not.have.been.called;
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
        expect(response).to.be.false;
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
