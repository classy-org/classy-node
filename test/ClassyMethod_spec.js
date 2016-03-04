import {expect} from 'chai';

import ClassyMethod from '../src/ClassyMethod';

describe('ClassyMethod', () => {

  it('should instantiate', () => {
    var classyMethod = new ClassyMethod({
      method: 'GET',
      path: 'history/{transactionId}',
      urlParams: ['transactionId'],
    });

    classyMethod();

    expect(true).to.be.true;
  });

});
