import {expect} from 'chai';

import Bar from '../../src/resources/Campaign';

describe('Campaign', () => {
  it('should create a campaign constructor', () => {
    const classy = new Bar('cd', 'bf');

    expect(true).to.be.true;
  });
});
