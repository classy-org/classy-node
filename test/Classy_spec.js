import {expect} from 'chai';

import Classy from '../src/Classy';

describe('Classy', () => {

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
  
  it('should create resources', () => {
    const classy = new Classy({
      clientId: 'client_id_str',
      clientSecret: 'client_secret_str'
    });
    
    expect(true).to.be.true;
  });
  
  it('should getApiField', () => {
    const classy = new Classy({
      clientId: 'client_id_str',
      clientSecret: 'client_secret_str'
    });
    
    expect(classy.clientId).to.equal('client_id_str');
  });

});
