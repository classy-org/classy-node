import {expect} from 'chai';
import {utils} from '../src/utils';
import _ from 'lodash';

describe('utils', () => {

  describe('getRegexMatches', () => {
    it('should match param regex', () => {

      const PARAM_REGEX = /\{(.*?)\}/g;
      const url = '/campaigns/{id}';

      let result = utils.getRegexMatches(url, PARAM_REGEX);

      expect(result[0]).to.equal('id');
    });
  });

  describe('generateOauthGrantType', () => {
    it('should determine oauth grant type of password', () => {
      const options = {
        username: 'test',
        password: 'test'
      };

      let result = utils.generateOauthGrantType(options);

      expect(result).to.equal('password');
    });

    it('should determine oauth grant type of refresh_token', () => {
      const options = {
        refreshToken: 'test'
      };

      let result = utils.generateOauthGrantType(options);

      expect(result).to.equal('refresh_token');
    });

    it('should determine oauth grant type of client_credentials', () => {
      const options = {};

      let result = utils.generateOauthGrantType(options);

      expect(result).to.equal('client_credentials');
    });
  });

  describe('isAuthRequest', () => {
    it('should identify auth requests', () => {
      const resolvedPath = '/oauth2/auth';

      let result = utils.isAuthRequest(resolvedPath);

      expect(result).to.equal(true);
    });

    it('should identify non-auth requests', () => {
      const resolvedPath = '/campaigns/123';

      let result = utils.isAuthRequest(resolvedPath);

      expect(result).to.equal(false);
    });
  });

  describe('getDataFromArgs', () => {
    it('should get data from a list of arguments', () => {
      const data = {
        test: 'test'
      };

      let result = utils.getDataFromArgs(['123', '456', data]);

      expect(result).to.equal(data);
    });

    it('should recognize when no data is present', () => {
      let result = utils.getDataFromArgs(['123', '456']);

      expect(_.isPlainObject(result)).to.be.true;
      expect(_.isEmpty(result)).to.be.true;
    });

    it('should recognize when no args are present', () => {
      let result = utils.getDataFromArgs([]);

      expect(_.isPlainObject(result)).to.be.true;
      expect(_.isEmpty(result)).to.be.true;
    });
  });

});
