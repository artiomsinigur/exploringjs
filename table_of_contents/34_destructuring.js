// =========================
// 34 Destructuring
// =========================
    // ## 34.1 A first taste of destructuring
    // =================================
        // With normal assignment, you extract one piece of data at a time – for example:
        const arr = ['a', 'b', 'c'];
        const x = arr[0]; // extract
        const y = arr[1]; // extract

        // With destructuring, you can extract multiple pieces of data at the same time via destruction patterns in locations that receive data.
        const arr = ['a', 'b', 'c'];
        const [x, y] = arr; // (A)
        assert.equal(x, 'a');
        assert.equal(y, 'b');

    // ## 34.2 Constructing vs. extracting
    // ==================================
        // 1. Constructing data looks as follows:
            // Constructing: one property at a time
            const jane1 = {};
            jane1.first = 'Jane';
            jane1.last = 'Doe';

            // Constructing: multiple properties
            const jane2 = {
                first: 'Jane',
                last: 'Doe',
            };

        // 2. Extracting data looks as follows:
            const jane = {
                first: 'Jane',
                last: 'Doe',
            };
            
            // Extracting: one property at a time
            const f1 = jane.first;
            const l1 = jane.last;
            assert.equal(f1, 'Jane');
            assert.equal(l1, 'Doe');
            
            // Extracting: multiple properties (NEW!)
            const {first: f2, last: l2} = jane; // (A)
            assert.equal(f2, 'Jane');
            assert.equal(l2, 'Doe');
            
        // The operation in line A is new: we declare two variables f2 and l2 and initialize them via destructuring (multivalue extraction).

    // ## 34.3 Where can we destructure?
    // ================================
        // * Variable declarations with const or let:
            const [a] = ['x'];
            assert.equal(a, 'x');

        // * Assignments:
            let b;
            [b] = ['z'];
            assert.equal(b, 'z');

        // * Parameter definitions:
            const f = ([x]) => x;
            assert.equal(f(['a']), 'a');

    // ## 34.4 Object-destructuring
    // =================================
        const address = {
            street: 'Evergreen Terrace',
            number: '742',
            city: 'Springfield',
            state: 'NT',
            zip: '49007',
        };

        const { street: s, city: c } = address;
        assert.equal(s, 'Evergreen Terrace');
        assert.equal(c, 'Springfield');

        // The pattern key 'street' has a match in the data. Therefore, the data value 'Evergreen Terrace' is assigned to the pattern variable s.

        // You can also object-destructure primitive values:
        const {length: len} = 'abc';
        assert.equal(len, 3);

        // And you can object-destructure Arrays. Array indices are also properties.
        const {0:x, 2:y} = ['a', 'b', 'c'];
        assert.equal(x, 'a');
        assert.equal(y, 'c');

        // ### 34.4.1 Property value shorthands
            const { street, city } = address;
            assert.equal(street, 'Evergreen Terrace');
            assert.equal(city, 'Springfield');

        // ### 34.4.2 Rest properties
            const obj = { a: 1, b: 2, c: 3 };
            const { a: propValue, ...remaining } = obj; // (A)
            
            assert.equal(propValue, 1);
            assert.deepEqual(remaining, {b:2, c:3});

    // ## 34.5 Array-destructuring
    // ==================================
        const [x, y] = ['a', 'b'];
        assert.equal(x, 'a');
        assert.equal(y, 'b');

        // You can skip elements by mentioning holes inside Array patterns:
        const [, x, y] = ['a', 'b', 'c']; // (A)
        assert.equal(x, 'b');
        assert.equal(y, 'c');

        // #### 34.5.1 Array-destructuring works with any iterable
            // Sets are iterable
            const mySet = new Set().add('a').add('b').add('c');
            const [first, second] = mySet;
            assert.equal(first, 'a');
            assert.equal(second, 'b');

            // Strings are iterable
            const [a, b] = 'xyz';
            assert.equal(a, 'x');
            assert.equal(b, 'y');

        // ### 34.5.2 Rest elements
            const [x, y, ...remaining] = ['a', 'b', 'c', 'd']; // (A)

            assert.equal(x, 'a');
            assert.equal(y, 'b');
            assert.deepEqual(remaining, ['c', 'd']);

    // ## 34.6 Examples of destructuring
    // ====================================
        // ### 34.6.1 Array-destructuring: swapping variable values
            // You can use Array-destructuring to swap the values of two variables without needing a temporary variable:

            let x = 'a';
            let y = 'b';
            
            [x,y] = [y,x]; // swap
            
            assert.equal(x, 'b');
            assert.equal(y, 'a');


        // ### 34.6.3 Object-destructuring: multiple return values
            // Destructuring is very useful if a function returns multiple values – either packaged as an Array or packaged as an object.

            // Consider a function findElement() that finds elements in an Array:

            // Its second parameter is a function that receives the value and index of an element and returns a boolean indicating if this is the element the caller is looking for. 
            // We are now faced with a dilemma: Should findElement() return the value of the element it found or the index? One solution would be to create two separate functions.

            // The following implementation avoids duplication by returning an object that contains both index and value of the element that is found:
            function findElement(arr, predicate) {
                for (let index=0; index < arr.length; index++) {
                    const value = arr[index];
                    if (predicate(value)) {
                        // We found something:
                        return { value, index };
                    }
                }
                // We didn’t find anything:
                return { value: undefined, index: -1 };
            }

            // Destructuring helps us with processing the result of findElement():
            const arr = [7, 8, 6];

            const {value, index} = findElement(arr, x => x % 2 === 0);
            assert.equal(value, 8);
            assert.equal(index, 1);

    // ## 34.8 What values can’t be destructured?
    // ==============================
        // ### 34.8.1 You can’t object-destructure undefined and null
            // Object-destructuring only fails if the value to be destructured is either undefined or null.

            assert.throws(
                () => { const {prop} = undefined; },
                {
                    name: 'TypeError',
                    message: "Cannot destructure property `prop` of " +
                    "'undefined' or 'null'.",
                }

    // ## 34.10 Default values
    // ==============================
        // Normally, if a pattern has no match, the corresponding variable is set to undefined:
        const {prop: p} = {};
        assert.equal(p, undefined);

        // If you want a different value to be used, you need to specify a default value (via =):
        
        // ### 34.10.1 Default values in Object-destructuring
        const {prop: p = 123} = {}; // (A)
        assert.equal(p, 123);

        // Or shorthand
        const {prop = 123} = {};
        assert.equal(prop, 123);

        // ### 34.10.2 Default values in Array-destructuring
        const [x=1, y=2] = [];

        assert.equal(x, 1);
        assert.equal(y, 2);

    // ## 34.12 Nested destructuring
    // =================================
        // Inside the Array pattern in line A, there is a nested object pattern at index 1.
        const arr = [
            { first: 'Jane', last: 'Bond' },
            { first: 'Lars', last: 'Croft' },
        ];
        const [, {first}] = arr;
        assert.equal(first, 'Lars');

        // Nested patterns can become difficult to understand, so they are best used in moderation.





