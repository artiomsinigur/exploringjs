import test from 'ava';
import {strict as assert} from 'assert';
import {divideCallback} from './divide.mjs';

test('divideCallback 1', t => {
    return divideCallback(8, 4)
    .then(result => {
        assert.equal(result, 2);
    });
});