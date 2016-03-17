import {expect} from 'chai';

import Classy from '../src/Classy';

describe('Classy', () => {

  it('should create instance with key, secret, and defaults', () => {
    const classy = new Classy({
      key: 'api_key',
      secret: 'api_secret'
    });

    // expect(classy._api.key).to.equal('api_key');
    // expect(classy._api.secret).to.equal('api_secret');
    // expect(classy._api.baseUrl).to.equal('https://api.classy.org');
    // expect(classy._api.basePath).to.equal('2.0');
    // expect(classy._api.strictSsl).to.equal(true);
  });
  
  // it('should create instance and override defaults', () => {
  //   const classy = new Classy({
  //     key: 'api_key',
  //     secret: 'api_secret',
  //     baseUrl: 'https://dev-gateway.classy-test.org',
  //     basePath: 'eng',
  //     strictSsl: false
  //   });
  // 
  //   expect(classy._api.key).to.equal('api_key');
  //   expect(classy._api.secret).to.equal('api_secret');
  //   expect(classy._api.baseUrl).to.equal('https://dev-gateway.classy-test.org');
  //   expect(classy._api.basePath).to.equal('eng');
  //   expect(classy._api.strictSsl).to.equal(false);
  // });
  // 
  // it('should create resources', () => {
  //   const classy = new Classy({
  //     key: 'api_key',
  //     secret: 'api_secret'
  //   });
  //   
  //   expect(true).to.be.true;
  // });
  // 
  // it('should getApiField', () => {
  //   const classy = new Classy({
  //     key: 'api_key',
  //     secret: 'api_secret'
  //   });
  //   
  //   expect(classy.getApiField('key')).to.equal('api_key');
  // });

});
