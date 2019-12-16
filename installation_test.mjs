import { AssertionError } from "assert";

// npm t installation_test.mjs

import test from 'ava';
import {strict as assert} from 'assert';
import { start } from "repl";

/*
const MIN_VERSION = [12, 2, 0];

function greaterOrEqual(numArr1, numArr2) {
  const maxLen = Math.max(numArr1.length, numArr2.length);
  for (let i=0; i<maxLen; i++) {
    // Missing parts are considered to be zero.
    let num1 = numArr1[i] || 0;
    let num2 = numArr2[i] || 0;
    if (num1 < num2) {
      return false;
    }
    if (num1 > num2) {
      return true;
    }
  }
  // The arrays are “equal”
  return true
}

test('Do assertions work?', t => {
  // Assert something simple
  assert.equal(1+1, 2);
});

test('Does greaterOrEqual() work?', () => {
  assert.equal(greaterOrEqual([1,2,3], [1,2]), true);
  assert.equal(greaterOrEqual([1,2], [1,2,3]), false);

  assert.equal(greaterOrEqual([4,0,5], [4,0,4]), true);
  assert.equal(greaterOrEqual([4,0,5], [4,0,5]), true);
  assert.equal(greaterOrEqual([4,0,5], [4,0,6]), false);
  
  assert.equal(greaterOrEqual([4,0,5], [3,0,0]), true);
  assert.equal(greaterOrEqual([4,0,5], [5,0,0]), false);
});

test(`Is Node.js version at least ${MIN_VERSION.join('.')}?`, () => {
  const installedVersionStr = process.versions.node;
  const installedVersion = installedVersionStr.split('.').map(str => Number(str));
  assert.ok(greaterOrEqual(installedVersion, MIN_VERSION),
    `Please use Node.js ${MIN_VERSION.join('.')} or later. Installed version: ${installedVersionStr}`);
});
*/

// {
//   const x = 0;
//   test('Test x', () => { assert.equal(x, 0) });
//   {
//     const y = 1;
//     test('Test x Scope b', () => { assert.equal(x, 0) });
//     test('Test y', () => { assert.equal(y, 1) });
//     {
//       const z = 2;
//       test('Test x Scope a', () => { assert.equal(x, 0) });
//       test('Test y Scope b', () => { assert.equal(y, 1) });
//       test('Test z Scope c', () => { assert.equal(z, 2) });
//     }
//   }
// }

/*
// Question 1
function createInc(startValue) {
  return (step) => {
    startValue += step;
    return startValue;
  };
}

const inc = createInc(5);
test('Incriment', () => assert.equal(inc(2), 7));
*/

/*
// Question 2
var foo = 'a';
{
  console.log(foo); // (A) // ReferenceError
  let foo;
  foo = 'b';
}
*/

/*
// Qestion 3
function b() {
	console.log(myVar); // 1
}

function a() {
	const myVar = 2;
	b();
}
const myVar = 1;
a();
*/

// test('Expect a', () => {assert.throws(() => new MyClass(), ReferenceError)});

let foo = 'a';
{
  test('Expect a', () => assert.equal(foo, undefined));
  let foo;
  foo = 'b';
}