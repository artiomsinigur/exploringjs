/* npm t exercises/booleans/truthiness_exrc.mjs
Instructions:
- Run this test (it fails).
- Change the second parameters of assert.equal() so that the test passes
*/

import test from 'ava';
import {strict as assert} from 'assert';

test('truthiness', t => {
  assert.equal(Boolean(null), false);
  assert.equal(Boolean(undefined), false);

  assert.equal(Boolean(''), false);
  assert.equal(Boolean('abc'), true);
  assert.equal(Boolean(0), false);
  assert.equal(Boolean(123), true);
  
  assert.equal(Boolean({}), true);
  assert.equal(Boolean([]), true);
});
