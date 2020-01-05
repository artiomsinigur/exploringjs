// ================================
// 28 Arrays
// ================================

        // ### 28.2.2 The .length of an Array
            // Every Array has a property .length that can be used to both read and change(!) the number of elements in an Array.

            // If you write to the Array at the index of the length, you append an element:
                arr[arr.length] = 'c';
                arr
                [ 'a', 'b', 'c' ]
                arr.length
                // 3

            // Another way of (destructively) appending an element is via the Array method .push():
                arr.push('d');
                arr
                [ 'a', 'b', 'c', 'd' ]

            // If you set .length, you are pruning the Array by removing elements:
                arr.length = 1;
                arr
                [ 'a' ]

        // ### 28.2.3 Clearing an Array
            // To clear (empty) an Array, you can either set its .length to zero:
                const arr = ['a', 'b', 'c'];
                arr.length = 0;
                assert.deepEqual(arr, []);

                // or you can assign a new empty Array to the variable storing the Array:
                let arr = ['a', 'b', 'c'];
                arr = [];
                assert.deepEqual(arr, []);

        // ### 28.2.4 Spreading into Array literals
            // Inside an Array literal, a spread element consists of three dots (...) followed by an expression. It results in the expression being evaluated and then iterated over. Each iterated value becomes an additional Array element

            // Warning: Copying is shallow. Nested Arrays are not copied but shared between them.
            
            const iterable = ['b', 'c'];
            ['a', ...iterable, 'd']
            [ 'a', 'b', 'c', 'd' ]

            // * We can use spreading to create a copy of an Array:
                const original = ['a', 'b', 'c'];
                const copy = [...original];

            // * Spreading is also convenient for concatenating Arrays (and other iterables) into Arrays:
                const arr1 = ['a', 'b'];
                const arr2 = ['c', 'd'];

                const concatenated = [...arr1, ...arr2, 'foo'];
                assert.deepEqual(concatenated, ['a', 'b', 'c', 'd', 'foo']);

            // * Strings are iterable
                [...'abc'] // strings
                [ 'a', 'b', 'c' ]

        // ### 28.2.5 Arrays: listing indices and entries
            // Method .keys() lists the indices of an Array:
                const arr = ['a', 'b'];
                assert.deepEqual(
                    [...arr.keys()], // (A)
                    [0, 1]);
                // .keys() returns an iterable. In line A, we spread to obtain an Array.

            // Method .entries() lists the contents of an Array as [index, element] pairs:
                const arr = ['a', 'b'];
                assert.deepEqual(
                    [...arr.entries()],
                    [[0, 'a'], [1, 'b']]);

        // ### 28.2.6 Is a value an Array?
            // Following are two ways of checking if a value is an Array:
            [] instanceof Array
            true
            Array.isArray([])
            true

    // ## 28.3 for-of and Arrays
    // ===================================
        // ### 28.3.2 for-of: iterating over [index, element] pairs
            // The following for-of loop iterates over [index, element] pairs. Destructuring gives us convenient syntax for setting up index and element in the head of for-of.

            for (const [index, element] of ['a', 'b'].entries()) {
                console.log(index, element);
            }
            // Output:
            // 0, 'a'
            // 1, 'b'
    
    // ## 28.5 Converting iterable and Array-like values to Arrays
    // ===================================
        // There are two common ways of converting iterable and Array-like values to Arrays:
            // 1. Spreading 
            // 2. Array.from()
        
        // Get an Array-like collection from a web browser’s DOM
        const domCollection = document.querySelectorAll('a');

        // Solution: convert it to an Array
        const arr = [...domCollection];
        assert.deepEqual(
            arr.map(x => x.href),
            ['https://2ality.com', 'https://exploringjs.com']);

        // ### 28.5.2 Converting iterables and Array-like objects to Arrays via Array.from() (advanced)
            // Array.from() can be used in two modes.

            // Mode 1:
                // #### 28.5.2.1 Mode 1 of Array.from(): converting
                Array.from(new Set(['a', 'b']))
                [ 'a', 'b' ]
                Array.from({length: 2, 0:'a', 1:'b'})
                [ 'a', 'b' ]
            
            // Mode 2:
                // #### 28.5.2.2 Mode 2 of Array.from(): converting and mapping
                // In this mode, Array.from() does several things:
                    // * It iterates over iterable.
                    // * It calls mapFunc with each iterated value. The optional parameter thisArg specifies a this for mapFunc.
                    // * It applies mapFunc to each iterated value.
                    // * It collects the results in a new Array and returns it.

                Array.from(new Set(['a', 'b']), x => x + x)
                [ 'aa', 'bb' ]

    // ## 28.6 Creating and filling Arrays with arbitrary lengths
    // ====================================
        // ### 28.6.1 Do you need to create an empty Array that you’ll fill completely later on?
            new Array(3)
            [ , , ,]

            // Caveat: If you use .fill() with an object, then each Array element will refer to this object (sharing it).
            const arr = new Array(3).fill({});
            arr[0].prop = true;
            assert.deepEqual(
              arr, [
                {prop: true},
                {prop: true},
                {prop: true},
              ]);

        // ### 28.6.3 Do you need to create an Array filled with objects?
            Array.from({length: 3}, () => ({}))
            [{}, {}, {}]

        // ### 28.6.4 Do you need to create a range of integers?
            // Method 1
                function createRange(start, end) {
                    return Array.from({length: end-start}, (_, i) => i+start);
                }
                assert.deepEqual(
                    createRange(2, 5),
                    [2, 3, 4]);

            // Method 2
                function createRange(end) {
                    const arr = new Array(end).keys()
                    return [...arr];
                }
                createRange(3)
                [0, 1, 2]

    // ## 28.7 Multidimensional Arrays
    // =============================================
        function initMultiArray(...dimensions) {
            function initMultiArrayRec(dimIndex) {
                if (dimIndex >= dimensions.length) {
                    return 0;
                } else {
                    const dim = dimensions[dimIndex];
                    const arr = [];
                    for (let i=0; i<dim; i++) {
                    arr.push(initMultiArrayRec(dimIndex+1));
                    }
                    return arr;
                }
            }
            return initMultiArrayRec(0);
        }

        const arr = initMultiArray(4, 3, 2);
        arr[3][2][1] = 'X'; // last in each dimension
        assert.deepEqual(arr, [
          [ [ 0, 0 ], [ 0, 0 ], [ 0, 0 ] ],
          [ [ 0, 0 ], [ 0, 0 ], [ 0, 0 ] ],
          [ [ 0, 0 ], [ 0, 0 ], [ 0, 0 ] ],
          [ [ 0, 0 ], [ 0, 0 ], [ 0, 'X' ] ],
        ]);
        
    // ## 28.9 Adding and removing elements (destructively and non-destructively)
    // ============================================
        // Most operations can be performed both:
            // 1. Destructively (modifying the Array)
            // 2. Non-destructively (producing a modified copy)

        // ### 28.9.1 Prepending elements and Arrays. The same is true to Append elements to an Array
            // In the following code, we destructively prepend single elements to arr1 and an Array to arr2:
            const arr1 = ['a', 'b'];
            arr1.unshift('x', 'y'); // prepend single elements
            assert.deepEqual(arr1, ['x', 'y', 'a', 'b']);
            
            const arr2 = ['a', 'b'];
            arr2.unshift(...['x', 'y']); // prepend Array
            assert.deepEqual(arr2, ['x', 'y', 'a', 'b']);

            // Spreading lets us unshift an Array into arr2.

            // Non-destructive prepending is done via spread elements:
            const arr1 = ['a', 'b'];
            assert.deepEqual(
              ['x', 'y', ...arr1], // prepend single elements
              ['x', 'y', 'a', 'b']);
            assert.deepEqual(arr1, ['a', 'b']); // unchanged!
            
            const arr2 = ['a', 'b'];
            assert.deepEqual(
              [...['x', 'y'], ...arr2], // prepend Array
              ['x', 'y', 'a', 'b']);
            assert.deepEqual(arr2, ['a', 'b']); // unchanged!

        // ### 28.9.3 Removing elements
            // These are three destructive ways of removing Array elements:
                // 1 arr.shift() - First element
                // 2 arr.pop() - Last element
                // 3 arr.splice(start, deleteCount) - One or more elements anywhere
                
            // Remove one or more elements anywhere:
            const arr3 = ['a', 'b', 'c', 'd'];
            assert.deepEqual(arr3.splice(1, 2), ['b', 'c']); // return deleted elements
            assert.deepEqual(arr3, ['a', 'd']); // remained elements on original array

    // ## 28.10 Methods: iteration and transformation (.find(), .map(), .filter(), etc.)
    // ======================================
        // ### 28.10.1 Callbacks for iteration and transformation methods
            // All iteration and transformation methods use callbacks

            // These callbacks have type signatures that look as follows:
            callback: (value: T, index: number, array: Array<T>) => boolean

            // That is, the callback gets three parameters (it is free to ignore any of them):
                // * value is the most important one. This parameter holds the iterated value that is currently being processed.
                // * index can additionally tell the callback what the index of the iterated value is.
                // * array points to the current Array (the receiver of the method call).

            .map() // fills its result with the values returned by its callback: (return new array)
            > ['a', 'b', 'c'].map(x => x + x)
            [ 'aa', 'bb', 'cc' ]

            .find() // returns the first Array element for which its callback returns true or undefined if it can't find anything
            > ['a', 'bb', 'ccc'].find(str => str.length >= 2)
            'bb'


        // ### 28.10.2 Searching elements: .find(), .findIndex()
            .findIndex() // returns the index of the first element for which its callback returns a truthy value (and -1 if it can’t find anything):
            > [6, -5, 8].findIndex(x => x < 0)
            1
            > [6, 5, 8].findIndex(x => x < 0)
            -1

        // ### 28.10.3 .map(): copy while giving elements new values (return new Array)
            // * The result of the Array method .map() always has the same length as the Array it is invoked on.
            
            // Example: with string method padStart()
            function numberLines(values) {
                const digitCount = String(values.length).length; // 2
                return values.map((value, index) => {
                    return String(index+1).padStart(digitCount, '0') + ': ' + value;
                });
            }

            test('numberLines', t => {
                const lines = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']; // input
                const numbered = ['01: a', '02: b', '03: c', '04: d', '05: e', '06: f', '07: g', '08: h', '09: i', '10: j']; // expected
                assert.deepEqual(numberLines(lines), numbered);
            });

        // ### 28.10.4 .flatMap(): mapping to zero or more values (return new Array)
            // The type signature of Array<T>.prototype.flatMap() is:
                .flatMap<U>(
                    callback: (value: T, index: number, array: T[]) => U|Array<U>,
                    thisValue?: any
                ): U[]

            // Both .map() and .flatMap() take a function callback as a parameter
                // * With .map(), each input Array element is translated to exactly one output element. That is, callback returns a single value.
                // * With .flatMap(), each input Array element is translated to zero or more output elements. That is, callback returns an Array of values (it can also return non-Array values, but that is rare).

            // This is .flatMap() in action:
            > ['a', 'b', 'c'].flatMap(x => [x,x])
            [ 'a', 'a', 'b', 'b', 'c', 'c' ]
            > ['a', 'b', 'c'].flatMap(x => [x])
            [ 'a', 'b', 'c' ]
            > ['a', 'b', 'c'].flatMap(x => [])
            []

            // #### 28.10.4.1 A simple implementation
                // You could implement .flatMap() as follows. for example, performs more checks.
                function flatMap(arr, mapFunc) {
                    const result = [];
                    for (const [index, elem] of arr.entries()) {
                        const x = mapFunc(elem, index, arr);
                        // We allow mapFunc() to return non-Arrays
                        if (Array.isArray(x)) {
                            result.push(...x);
                        } else {
                            result.push(x);
                        }
                    }
                    return result;
                }

            // #### 28.10.4.2 Use case: filtering and mapping at the same time
                // 1. We will use the following function processArray() to create an Array that we’ll then filter and map via .flatMap():
                    function processArray(arr, callback) {
                        return arr.map(x => {
                            try {
                                return { value: callback(x) };
                            } catch (e) {
                                return { error: e };
                            }
                        });
                    }

                // 2. Next, we create an Array results via processArray():
                    const results = processArray([1, -5, 6], throwIfNegative);

                    assert.deepEqual(results, [
                        { value: 1 },
                        { error: new Error('Illegal value: -5') },
                        { value: 6 },
                    ]);
                    
                    function throwIfNegative(value) {
                        if (value < 0) {
                            throw new Error('Illegal value: '+value);
                        }
                        return value;
                    }

                // 3. We can now use .flatMap() to extract just the values or just the errors from results:
                    // * return values
                    const values = results.flatMap(
                        result => result.value ? [result.value] : []);
                    assert.deepEqual(values, [1, 6]);
                        
                    // * return errors
                    const errors = results.flatMap(
                        result => result.error ? [result.error] : []);
                    assert.deepEqual(errors, [new Error('Illegal value: -5')]);

            // #### 28.10.4.3 Use case: mapping to multiple values
                // The Array method .map() maps each input Array element to one output element. But what if we want to map it to multiple output elements?
                const arrPoints = ['many', 'a', 'moon'];

                // with map()
                arrPoints.map(x => [...x]);
                    (3) [Array(4), Array(1), Array(4)]
                    0: (4) ["m", "a", "n", "y"]
                    1: ["a"]
                    2: (4) ["m", "o", "o", "n"]

                // with flatMap()
                arrPoints.map(x => [...x])
                ['m', 'a', 'n', 'y', 'a', 'm', 'o', 'o', 'n']

        // ### 28.10.5 .filter(): only keep some of the elements
            // The Array method .filter() returns an Array collecting all elements for which the callback returns a truthy value.

            // For example:
            > [-1, 2, 5, -7, 6].filter(x => x >= 0)
            [ 2, 5, 6 ]
            > ['a', 'b', 'c', 'd'].filter((_x,i) => (i%2)===0)
            [ 'a', 'c' ]

        // ### 28.10.6 .reduce(): deriving a value from an Array (advanced)
            // Method .reduce() is a powerful tool for computing a “summary” of an Array arr. A summary can be any kind of value:
                // * A number. For example, the sum of all elements of arr.
                
                // .reduce() has the following type signature (inside an Array<T>):

                .reduce<U>(
                  callback: (accumulator: U, element: T, index: number, array: T[]) => U, init?: U): U

                // * U is the type of the summary. Accumulator is just another name for “summary”.
                // * T is the type of the Array elements. 
                // T and U may or may not be different.

            // To compute the summary of an Array arr, .reduce() feeds all Array elements to its callback one at a time:
                const accumulator_0 = callback(init, arr[0]);
                const accumulator_1 = callback(accumulator_0, arr[1]);
                const accumulator_2 = callback(accumulator_1, arr[2]);
                // Etc.

                // callback combines the previously computed summary (stored in its parameter accumulator) with the current Array element and returns the next accumulator. The result of .reduce() is the final accumulator – the last result of callback after it has visited all elements.

            // #### 28.10.6.1 A first example
                function addAll(arr) {
                    const startSum = 0;
                    const callback = (sum, element) => sum + element;
                    return arr.reduce(callback, startSum);
                }
                assert.equal(addAll([1,  2, 3]), 6); // (A)
                assert.equal(addAll([7, -4, 2]), 5);

                // In this case, the accumulator holds the sum of all Array elements that callback has already visited.

                // How was the result 6 derived from the Array in line A? Via the following invocations of callback:
                callback(0, 1) --> 1
                callback(1, 2) --> 3
                callback(3, 3) --> 6

                // Notes:
                    // * The first parameters are the current accumulators (starting with parameter init of .reduce()).
                    // * The second parameters are the current Array elements.
                    // * The results are the next accumulators.
                    // * The last result of callback is also the result of .reduce().
            
            // #### 28.10.6.2 Example: finding indices via .reduce()
                const NOT_FOUND = -1;
                function indexOf(arr, searchValue) {
                return arr.reduce(
                    (result, elem, index) => {
                        if (result !== NOT_FOUND) {
                            // We have already found something: don’t change anything
                            return result;
                        } else if (elem === searchValue) {
                            return index;
                        } else {
                            return NOT_FOUND;
                        }
                    }, NOT_FOUND);
                }
                assert.equal(indexOf(['a', 'b', 'c'], 'b'), 1);
                assert.equal(indexOf(['a', 'b', 'c'], 'x'), -1);
                
                // One limitation of .reduce() is that you can’t finish early (in a for-of loop, you can break). 
                // Here, we always immediately return the result once we have found it.

                // Function double(arr) returns a copy of inArr whose elements are all multiplied by 2:
                function double(inArr) {
                    return inArr.reduce(
                        (sum, element) => {
                            sum.push(element * 2);
                            return sum;
                    }, []); 
                    // }, []); // if we omits the seconde param [] for reduce() the sum will throw an TypeError: sum.push is not a function. sum must be defined like Array
                }
                assert.deepEqual(double([1, 2, 3]), [2, 4, 6]);

    // ## 28.11 .sort(): sorting Arrays
    // ======================================
        // .sort() has the following type definition:
        sort(compareFunc?: (a: T, b: T) => number): this

        // These representations are compared via <. This operator compares lexicographically (the first characters are most significant).
        > [200, 3, 10].sort()
        [ 10, 200, 3 ]

        // When sorting human-language strings, you need to be aware that they are compared according to their code unit values (char codes):
        > ['pie', 'cookie', 'éclair', 'Pie', 'Cookie', 'Éclair'].sort()
        [ 'Cookie', 'Pie', 'cookie', 'pie', 'Éclair', 'éclair' ]

        // Note that .sort() sorts in place; it changes and returns its receiver:
        > const arr = ['a', 'c', 'b'];
        > arr.sort()
        [ 'a', 'b', 'c' ]

        // ### 28.11.1 Customizing the sort order
            // You can customize the sort order via the parameter compareFunc, which must return a number that is:
                // * negative if a < b
                // * zero if a === b
                // * positive if a > b

        // ### 28.11.2 Sorting numbers
            // You can use this helper function to sort numbers:
            function compareNumbers(a, b) {
                if (a < b) {
                    return -1;
                } else if (a === b) {
                    return 0;
                } else {
                    return 1;
                }
            }
            assert.deepEqual(
                [200, 3, 10].sort(compareNumbers),
                [3, 10, 200]);

            // The following is a quick and dirty alternative.
            > [200, 3, 10].sort((a,b) => a - b)
            [ 3, 10, 200 ]

        // ### 28.11.3 Sorting objects
            const arr = [ {age: 200}, {age: 3}, {age: 10} ];
            assert.deepEqual(
                arr.sort((obj1, obj2) => obj1.age - obj2.age),
                [{ age: 3 }, { age: 10 }, { age: 200 }] );

    // ## 28.12 Quick reference: Array<T>
    // =================================
        // Legend:
            // W: method changes the Array (destructive).
            // R: method does not change the Array (non-destructive).

        // ### 28.12.3 Methods of Array<T>.prototype
        .concat(...items: Array<T[] | T>): T[] [R, ES3]
            // Returns a new Array that is the concatenation of the receiver and all items. Non-Array parameters (such as 'b' in the following example) are treated as if they were Arrays with single elements.
        
            ['a'].concat('b', ['c', 'd'])
            [ 'a', 'b', 'c', 'd' ]

        // or we can use spreading
        const arr = ['b', 'c'];
        ['a', ...arr]
        // ['a', 'b', 'c']

        .copyWithin(target: number, start: number, end=this.length): this [W, ES6]
            // Copies the elements whose indices range from (including) start to (excluding) end to indices starting with target. Overlapping is handled correctly.
        
            ['a', 'b', 'c', 'd'].copyWithin(0, 2, 4)
            [ 'c', 'd', 'c', 'd' ]
            
            // If start or end is negative, then .length is added to it.

        .entries(): Iterable<[number, T]> [R, ES6]
            // Returns an iterable over [index, element] pairs.
            
            Array.from(['a', 'b'].entries())
            [ [ 0, 'a' ], [ 1, 'b' ] ]

        .every(callback: (value: T, index: number, array: Array<T>) => boolean, thisArg?: any): boolean [R, ES5]
            // Returns true if callback returns a truthy value for every element. Otherwise, it returns false. It stops as soon as it receives a falsy value. This method corresponds to universal quantification (“for all”, ∀) in mathematics.
            
            [1, 2, 3].every(x => x > 0)
            true
            [1, -2, 3].every(x => x > 0)
            false
            
            // Related method: .some() (“exists”).

        .fill(value: T, start=0, end=this.length): this [W, ES6]
            // Assigns value to every index between (including) start and (excluding) end.
            
            [0, 1, 2].fill('a')
            [ 'a', 'a', 'a' ]
            
            // Caveat: Don’t use this method to fill an Array with an object obj; then each element will refer to obj (sharing it). In this case, it’s better to use Array.from().

        .filter(callback: (value: T, index: number, array: Array<T>) => any, thisArg?: any): T[] [R, ES5]
            // Returns an Array with only those elements for which callback returns a truthy value.
            
            [1, -2, 3].filter(x => x > 0)
            [ 1, 3 ]

        .find(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): T | undefined [R, ES6]
            // The result is the first element for which predicate returns a truthy value. If there is no such element, the result is undefined.
            
            [1, -2, 3].find(x => x < 0)
            -2
            [1, 2, 3].find(x => x < 0)
            undefined

        .findIndex(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): number [R, ES6]
            // The result is the index of the first element for which predicate returns a truthy value. If there is no such element, the result is -1.
            
            > [1, -2, 3].findIndex(x => x < 0)
            1
            > [1, 2, 3].findIndex(x => x < 0)
            -1

        .flat(depth = 1): any[] [R, ES2019]
            // “Flattens” an Array: It descends into the Arrays that are nested inside the input Array and creates a copy where all values it finds at level depth or lower are moved to the top level.
            
            > [ 1,2, [3,4], [[5,6]] ].flat(0) // no change
            [ 1, 2, [3,4], [[5,6]] ]
            
            > [ 1,2, [3,4], [[5,6]] ].flat(1)
            [1, 2, 3, 4, [5,6]]
            
            > [ 1,2, [3,4], [[5,6]] ].flat(2)
            [1, 2, 3, 4, 5, 6]

        .flatMap<U>(callback: (value: T, index: number, array: T[]) => U|Array<U>, thisValue?: any): U[] [R, ES2019]
            // The result is produced by invoking callback() for each element of the original Array and concatenating the Arrays it returns.
            
            > ['a', 'b', 'c'].flatMap(x => [x,x])
            [ 'a', 'a', 'b', 'b', 'c', 'c' ]
            > ['a', 'b', 'c'].flatMap(x => [x])
            [ 'a', 'b', 'c' ]
            > ['a', 'b', 'c'].flatMap(x => [])
            []

        .forEach(callback: (value: T, index: number, array: Array<T>) => void, thisArg?: any): void [R, ES5]
            // Calls callback for each element.
            
            ['a', 'b'].forEach((x, i) => console.log(x, i))
            
            // Output:
            // 'a', 0
            // 'b', 1

            // Note: A for-of loop is usually a better choice: it’s faster, supports break and can iterate over arbitrary iterables.

        .includes(searchElement: T, fromIndex=0): boolean [R, ES2016]
            // Returns true if the receiver has an element whose value is searchElement and false, otherwise. Searching starts at index fromIndex.
            
            > [0, 1, 2].includes(1)
            true
            > [0, 1, 2].includes(5)
            false

        .indexOf(searchElement: T, fromIndex=0): number [R, ES5]
            // Returns the index of the first element that is strictly equal to searchElement. Returns -1 if there is no such element. Starts searching at index fromIndex, visiting higher indices next.
            
            > ['a', 'b', 'a'].indexOf('a')
            0
            > ['a', 'b', 'a'].indexOf('a', 1)
            2
            > ['a', 'b', 'a'].indexOf('c')
            -1

        .join(separator = ','): string [R, ES1]
            // Creates a string by concatenating string representations of all elements, separating them with separator.
            
            > ['a', 'b', 'c'].join('##')
            'a##b##c'
            > ['a', 'b', 'c'].join()
            'a,b,c'
            > ['a', 'b', 'c'].join('')
            'abc'

        .keys(): Iterable<number> [R, ES6]
            // Returns an iterable over the keys of the receiver.
            
            > [...['a', 'b'].keys()]
            [ 0, 1 ]

        .lastIndexOf(searchElement: T, fromIndex=this.length-1): number [R, ES5]
            // Returns the index of the last element that is strictly equal to searchElement. Returns -1 if there is no such element. Starts searching at index fromIndex, visiting lower indices next.
            
            > ['a', 'b', 'a'].lastIndexOf('a')
            2
            > ['a', 'b', 'a'].lastIndexOf('a', 1)
            0
            > ['a', 'b', 'a'].lastIndexOf('c')
            -1
            
        .map<U>(mapFunc: (value: T, index: number, array: Array<T>) => U, thisArg?: any): U[] [R, ES5]
            // Returns a new Array, in which every element is the result of mapFunc being applied to the corresponding element of the receiver.
            
            > [1, 2, 3].map(x => x * 2)
            [ 2, 4, 6 ]
            > ['a', 'b', 'c'].map((x, i) => i)
            [ 0, 1, 2 ]

        .pop(): T | undefined [W, ES3]
            // Removes and returns the last element of the receiver. That is, it treats the end of the receiver as a stack. The opposite of .push().
            
            > const arr = ['a', 'b', 'c'];
            > arr.pop()
            'c'
            > arr
            [ 'a', 'b' ]

        .push(...items: T[]): number [W, ES3]
            // Adds zero or more items to the end of the receiver. That is, it treats the end of the receiver as a stack. The return value is the length of the receiver after the change. The opposite of .pop().
            
            > const arr = ['a', 'b'];
            > arr.push('c', 'd')
            4
            > arr
            [ 'a', 'b', 'c', 'd' ]

        .reduce<U>(callback: (accumulator: U, element: T, index: number, array: T[]) => U, init?: U): U [R, ES5]
            // This method produces a summary of the receiver: it feeds all Array elements to callback, which combines a current summary (in parameter accumulator) with the current Array element and returns the next accumulator:
            
            const accumulator_0 = callback(init, arr[0]);
            const accumulator_1 = callback(accumulator_0, arr[1]);
            const accumulator_2 = callback(accumulator_1, arr[2]);
            // Etc.

            // The result of .reduce() is the last result of callback after it has visited all Array elements.
            
            > [1, 2, 3].reduce((accu, x) => accu + x, 0)
            6
            > [1, 2, 3].reduce((accu, x) => accu + String(x), '')
            '123'

            // If no init is provided, the Array element at index 0 is used and the element at index 1 is visited first. Therefore, the Array must have at least length 1.

        .reduceRight<U>(callback: (accumulator: U, element: T, index: number, array: T[]) => U, init?: U): U [R, ES5]
            // Works like .reduce(), but visits the Array elements backward, starting with the last element.
            
            > [1, 2, 3].reduceRight((accu, x) => accu + String(x), '')
            '321'

        .reverse(): this [W, ES1]
            // Rearranges the elements of the receiver so that they are in reverse order and then returns the receiver.
            
            > const arr = ['a', 'b', 'c'];
            > arr.reverse()
            [ 'c', 'b', 'a' ]
            > arr
            [ 'c', 'b', 'a' ]

        .shift(): T | undefined [W, ES3]
            // Removes and returns the first element of the receiver. The opposite of .unshift().
            
            > const arr = ['a', 'b', 'c'];
            > arr.shift()
            'a'
            > arr
            [ 'b', 'c' ]

        .slice(start=0, end=this.length): T[] [R, ES3]
            // Returns a new Array containing the elements of the receiver whose indices are between (including) start and (excluding) end.
            
            > ['a', 'b', 'c', 'd'].slice(1, 3)
            [ 'b', 'c' ]
            > ['a', 'b'].slice() // shallow copy
            [ 'a', 'b' ]
            
            // Negative indices are allowed and added to .length:

            > ['a', 'b', 'c'].slice(-2)
            [ 'b', 'c' ]

        .some(callback: (value: T, index: number, array: Array<T>) => boolean, thisArg?: any): boolean [R, ES5]
            // Returns true if callback returns a truthy value for at least one element. Otherwise, it returns false. It stops as soon as it receives a truthy value. This method corresponds to existential quantification (“exists”, ∃) in mathematics.
            
            > [1, 2, 3].some(x => x < 0)
            false
            > [1, -2, 3].some(x => x < 0)
            true

            // Related method: .every() (“for all”).

        .sort(compareFunc?: (a: T, b: T) => number): this [W, ES1]
            // Sorts the receiver and returns it. By default, it sorts string representations of the elements. It does so lexicographically and according to the code unit values (char codes) of the characters:
            
            > ['pie', 'cookie', 'éclair', 'Pie', 'Cookie', 'Éclair'].sort()
            [ 'Cookie', 'Pie', 'cookie', 'pie', 'Éclair', 'éclair' ]
            > [200, 3, 10].sort()
            [ 10, 200, 3 ]

            // You can customize the sort order via compareFunc, refer to some examples above on chapiter ## 28.11 .sort() 

            // .sort() is stable - Since ECMAScript 2019, sorting is guaranteed to be stable

        .splice(start: number, deleteCount=this.length-start, ...items: T[]): T[] [W, ES3]
            // At index start, it removes deleteCount elements and inserts the items. It returns the deleted elements.
            
            > const arr = ['a', 'b', 'c', 'd'];
            > arr.splice(1, 2, 'x', 'y')
            [ 'b', 'c' ]
            > arr
            [ 'a', 'x', 'y', 'd' ]

            // start can be negative and is added to .length if it is:
            
            > ['a', 'b', 'c'].splice(-2, 2)
            [ 'b', 'c' ]

        .toString(): string [R, ES1]
            // Converts all elements to strings via String(), concatenates them while separating them with commas, and returns the result.
            
            > [1, 2, 3].toString()
            '1,2,3'
            > ['1', '2', '3'].toString()
            '1,2,3'
            > [].toString()
            ''

        .values(): Iterable<T> [R, ES6]
            // Returns an iterable over the values of the receiver.
            
            > [...['a', 'b'].values()]
            [ 'a', 'b' ]
