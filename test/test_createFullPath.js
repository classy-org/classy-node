import _createFullPath from '../src/ClassyResource/_createFullPath.js';

import {expect} from 'chai';

describe('_createFullPath', () => {

  const tests = [
    ['/a/b', false, '/c/d', '/c/d/a/b'],
    ['/a/b/', false, '/c/d', '/c/d/a/b/'],
    ['/a/b/', false, '/c/d/', '/c/d/a/b/'],
    ['/a/b', false, '/c/d/', '/c/d/a/b'],
    ['/a//b', false, '/c/d/', '/c/d/a/b'],
    ['/a///b', false, '/c/d/', '/c/d/a/b'],
    ['/a//b', false, '//c/d/', '/c/d/a/b'],
    ['/a///b', false, 'c/d/', 'c/d/a/b'],
    ['a/b///', false, 'c/d/', 'c/d/a/b/'],

    ['/a/b', true, '/c/d', '/a/b'],
    ['/a/b/', true, '/c/d', '/a/b/'],
    ['/a/b/', true, '/c/d/', '/a/b/'],
    ['/a/b', true, '/c/d/', '/a/b'],
    ['/a//b', true, '/c/d/', '/a/b'],
    ['/a///b', true, '/c/d/', '/a/b'],
    ['/a//b', true, '//c/d/', '/a/b'],
    ['/a///b', true, 'c/d/', '/a/b'],
    ['a/b///', true, 'c/d/', 'a/b/'],
  ];

  const runTest = (resolvedPath, isAuthRequest, basePath, expectedOutput) => {
    const testName = `_createFullPath(${resolvedPath}, ${isAuthRequest}, ${basePath})`
      + ` => ${expectedOutput}`;
    it(testName, done => {
      let error = null;
      try {
        const output = _createFullPath(resolvedPath, isAuthRequest, basePath);
        expect(output).to.equal(expectedOutput);
      } catch (e) {
        error = e;
      } finally {
        done(error);
      }
    });
  };

  for (const test of tests) {
    runTest(test[0], test[1], test[2], test[3]);
  }

});

/* Original implementation, for posterity:

export default function _createFullPath(resolvedPath, isAuthRequest, basePathOverride) {
  const fullPath = path.join(
    isAuthRequest ? '' : basePathOverride || this.basePath,
    resolvedPath
  ).replace(/\\/g, '/');

  const normalizedPath = path.normalize(fullPath);

  return normalizedPath;
}

*/
