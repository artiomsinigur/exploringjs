// ============================
// 27 Synchronous iteration
// ============================

    // ## 27.1 What is synchronous iteration about?
    // =================================
        // Synchronous iteration is a protocol (interfaces plus rules for using them) that connects two groups of entities in JavaScript:
            // * Data sources:
            // * Data consumers:

    // ## 27.2 Core iteration constructs: iterables and iterators
    // =================================
        // * An iterable is an object whose contents can be traversed sequentially.
        // * An iterator is the pointer used for the traversal.

        // These are type definitions (in TypeScript’s notation) for the interfaces of the iteration protocol:
            interface Iterable<T> {
                [Symbol.iterator]() : Iterator<T>;
            }
            
            interface Iterator<T> {
                next() : IteratorResult<T>;
            }
            
            interface IteratorResult<T> {
                value: T;
                done: boolean;
            }

            // The interfaces are used as follows:
                // 1 You ask an Iterable for an iterator via the method whose key is Symbol.iterator.
                // 2 The Iterator returns the iterated values via its method .next().
                // 3 The values are not returned directly, but wrapped in objects with two properties:
                    // * .value is the iterated value.
                    // * .done indicates if the end of the iteration has been reached yet. It is true after the last iterated value and false beforehand.

    // ## 27.3 Iterating manually
    // ==================================
        // This is an example of using the iteration protocol:
        
        const iterable = ['a', 'b'];

        // The iterable is a factory for iterators:
        const iterator = iterable[Symbol.iterator]();
        
        // Call .next() until .done is true:
        assert.deepEqual(
          iterator.next(), { value: 'a', done: false });
        assert.deepEqual(
          iterator.next(), { value: 'b', done: false });
        assert.deepEqual(
          iterator.next(), { value: undefined, done: true });

    // ## 27.4 Iteration in practice
    // ====================================
        // ### 27.4.1 Iterating over Arrays
            // Destructuring via Array patterns (explained later) also uses iteration under the hood:
            const myArray = ['a', 'b'];

            const [first, second] = myArray;
            assert.equal(first, 'a');
            assert.equal(second, 'b');

        // ### 27.4.2 Iterating over Sets
            // JavaScript’s Set data structure is iterable. That means for-of works:
            const mySet = new Set().add('a').add('b').add('c');

            for (const x of mySet) {
              console.log(x);
            }
            // Output:
            // 'a'
            // 'b'
            // 'c'

            // #### As does Array-destructuring:
                const [first, second] = mySet;
                assert.equal(first, 'a');
                assert.equal(second, 'b');

    // 27.5 ## Quick reference: synchronous iteration
    // =====================================
        // The following built-in data sources are iterable:
            Arrays
            Strings
            Maps
            Sets
            (Browsers: DOM data structures)

            // To iterate over the properties of objects, you need helpers such as Object.keys() and Object.entries(). That is necessary because properties exist at a different level that is independent of the level of data structures.

        // ### Example: Iterate an object with for of loop
            
            const obj = {foo: 'abc', bool: true};

            // 1.1 Object.entries() - Log the keys and values
                for(const [key, value] of Object.entries(obj)) {
                    console.log(key, value);
                }
                // foo abc
                // bool true

            // 1.2 Object.entries() - Log the keys or the values
                for(const [key, value] of Object.entries(obj)) {
                    console.log(key);
                }
                // foo
                // bool

            // 2. Object.keys() - Log the keys
                for(const [key] of Object.entries(obj)) {
                    console.log(key);
                }
                // foo
                // bool

            // 2. Object.values() - Log the values
                for(const [value] of Object.entries(obj)) {
                    console.log(value);
                }
                // abc
                // true

        // ### 27.5.2 Iterating constructs
            // The following constructs are based on iteration:
            // Plain objects are not iterable.
                
            const iterable = ['a', 'b'];
            // * Destructuring via an Array pattern:
                const [x,y] = iterable;
                
            // * The for-of loop:
                for (const x of iterable) { /*···*/ }
            
            // * Array.from():
                const arr = Array.from(iterable);
                Array.from(iterable, (x) => console.log(x));
                // a
                // b
            
            // * Spreading (via ...) into function calls and Array literals:
                func(...iterable);
                const arr = [...iterable];
            
            // * new Map() and new Set():
                const m = new Map(iterableOverKeyValuePairs);
                const s = new Set(iterableOverElements);
            
            // * Promise.all() and Promise.race():
                const promise1 = Promise.all(iterableOverPromises);
                const promise2 = Promise.race(iterableOverPromises);

            // * yield*:
                function* generatorFunction() {
                    yield* iterable;
                }




        
