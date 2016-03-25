import {expect} from 'chai';

import {utils} from '../src/utils';

describe('utils', () => {

  it('should successfully match param regex', () => {

    const PARAM_REGEX = /\{(.*?)\}/g;
    const url = '/campaigns/{id}';

    let result = utils.getRegexMatches(url, PARAM_REGEX);

    expect(result[0]).to.equal('id');
  });

  it('should successfully determine oauth grant type of password', () => {
    const options = {
      username: 'test',
      password: 'test'
    };

    let result = utils.generateOauthGrantType(options);

    expect(result).to.equal('password');
  });

  it('should successfully determine oauth grant type of refresh_token', () => {
    const options = {
      refreshToken: 'test'
    };

    let result = utils.generateOauthGrantType(options);

    expect(result).to.equal('refresh_token');
  });

});
