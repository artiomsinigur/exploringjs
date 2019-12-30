// ===========================
// 25 Objects
// ===========================
    
    // ## 25.1 What is an object?
    // ==============================
        // * An object is a set of properties (key-value entries).
        // * A property key can only be a string or a symbol.

        // ### 25.1.1 Roles of objects: record vs. dictionary
            // Objects play two roles in JavaScript:
                // * Records: Objects-as-records have a fixed number of properties, whose keys are known at development time. Their values can have different types.
                // * Dictionaries: Objects-as-dictionaries have a variable number of properties, whose keys are not known at development time. All of their values have the same type.

    // ## Property definitions
        let o = { 
            a: a,
            b: b,
            c: c
        }

        // Shorthand property names (ES2015)
        let o = {a, b, c}

    // ## Method definitions
        let o = {
            property: function (parameters) {},
            get property() {},
            set property(value) {}
        }

        // Shorthand method names (ES2015)
        let o = {
            property(parameters) {},
            *generator() {}
        }

    // * Since ES5, keywords are allowed as unquoted property keys in object literals and after the dot operator.
    // * Duplicate keys are allowed, too. Later entries override earlier ones.
        let a = {x: 1, x: 2}
        console.log(a) // {x: 2}

    // ## 25.2 Objects as records
    // ===============================
        // ### 25.2.1 Object literals: properties
            const jane = {
                first: 'Jane',
                last: 'Doe', // optional trailing comma
            };

        // ### 25.2.2 Object literals: property value shorthands
            // Whenever the value of a property is defined via a variable name and that name is the same as the key, you can omit the key.
            
            function createPoint(x, y) {
                return {x, y};
            }
            assert.deepEqual( createPoint(9, 2), { x: 9, y: 2 } );

        // ### 25.2.3 Getting properties
            // This is how you get (read) a property (line A):

            const jane = {
                first: 'Jane',
                last: 'Doe',
            };
            
            // Get property .first
            assert.equal(jane.first, 'Jane'); // (A)

        // ### 25.2.4 Setting properties
            // This is how you set (write to) a property:
            
            const obj = {
                prop: 1,
            };
            assert.equal(obj.prop, 1);
            obj.prop = 2; // (A)
            assert.equal(obj.prop, 2);

            // If we set an unknown property, we create a new entry:
            
            const obj = {}; // empty object
            assert.deepEqual(
            Object.keys(obj), []);

        // ### 25.2.5 Object literals: methods
            const jane = {
                first: 'Jane', // data property
                says(text) {   // method
                    return `${this.first} says “${text}”`; // (A)
                }, // comma as separator (optional at end)
            };
            assert.equal(jane.says('hello'), 'Jane says “hello”');

            // During the method call jane.says('hello'), jane is called the receiver of the method call and assigned to the special variable this. That enables method .says() to access the sibling property .first in line A.

        // ### 25.2.6 Object literals: accessors
            // There are two kinds of accessors in JavaScript:
                // * A getter is a method-like entity that is invoked by getting a property.
                // * A setter is a method-like entity that is invoked by setting a property.

            // #### 25.2.6.1 Getters
                const jane = {
                    first: 'Jane',
                    last: 'Doe',
                    get full() {
                        return `${this.first} ${this.last}`;
                    },
                };
                
                assert.equal(jane.full, 'Jane Doe');
                jane.first = 'John';
                assert.equal(jane.full, 'John Doe');

            // #### 25.2.6.2 Setters
                const jane = {
                    first: 'Jane',
                    last: 'Doe',
                    set full(fullName) {
                        const parts = fullName.split(' ');
                        this.first = parts[0];
                        this.last = parts[1];
                    },
                };
                    
                jane.full = 'Richard Roe';
                assert.equal(jane.first, 'Richard');
                assert.equal(jane.last, 'Roe');
    
    // ## 25.3 Spreading into object literals (...)
    // ================================
        // Inside an object literal, a spread property adds the properties of another object to the current one:
        const obj = {foo: 1, bar: 2};
        {...obj, baz: 3}
        { foo: 1, bar: 2, baz: 3 }

        // If property keys clash, the property that is mentioned last “wins”:
        > const obj = {foo: 1, bar: 2, baz: 3};
        > {...obj, foo: true}
        { foo: true, bar: 2, baz: 3 }
        > {foo: true, ...obj}
        { foo: 1, bar: 2, baz: 3 }

        // All values are spreadable, even undefined and null:
        > {...undefined}
        {}
        > {...null}
        {}
        > {...123}
        {}
        > {...'abc'}
        { '0': 'a', '1': 'b', '2': 'c' }
        > {...['a', 'b']}
        { '0': 'a', '1': 'b' }

        // ### 25.3.1 Use case for spreading: copying objects
            // You can use spreading to create a copy of an object original:
            const original = {a: 1, b:true};
            const copy = {...original};
            {a: 1, b:true}

            // Caveat – copying is shallow: copy is a fresh object with duplicates of all properties (key-value entries) of original. But if property values are objects, then those are not copied themselves; they are shared between original and copy.
            const original = { a: 1, b: {foo: true} };
            const copy = {...original};
            copy.a = 2;
            assert.deepEqual(original, {a:1, b: {foo: true}}); // no change
            
            // However, deeper levels are not copied. For example, the value of .b is shared between original and copy. Changing .b in the copy also changes it in the original.
            copy.b.foo = false;
            assert.deepEqual(original, {a:1, b: {foo: false}}); // was changed

        // ### 25.3.2 Use case for spreading: default values for missing properties
            // If one of the inputs of your code is an object with data, you can make properties optional by specifying default values that are used if those properties are missing.
            const DEFAULTS = {foo: 'a', bar: 'b'};
            const providedData = {foo: 1};
            
            const allData = {...DEFAULTS, ...providedData};
            assert.deepEqual(allData, {foo: 1, bar: 'b'});

            // The result, the object allData, is created by copying DEFAULTS and overriding its properties with those of providedData.

            // or, it's possible also specify them inside the object literal, individually:
            const providedData = {foo: 1};
            const allData = {foo: 'a', bar: 'b', ...providedData};

    // ## 25.4 Methods
    // ================================
        // Somewhat surprisingly, methods are functions:
        assert.equal(typeof jane.says, 'function');

        // ### 25.4.2 .call() and apply(): specifying this via a parameter
            // Note: The fundamental difference between them is that: 
                // 1. call() accepts an argument list, 
                // 2. while apply() accepts a single array of arguments.

            // Remember that each function someFunc is also an object and therefore has methods. One such method is .call() – it lets you call a function while specifying this via a parameter:
            someFunc.call(thisValue, arg1, arg2, arg3);

            // #### 25.4.2.1 Methods and .call()
                // If you make a method call, this is an implicit parameter that is filled in via the receiver of the call:
                const obj = {
                    method(x) {
                        assert.equal(this, obj); // implicit parameter
                        assert.equal(x, 'a');
                    },
                };
                obj.method('a'); // receiver is `obj`

                // The method call in the last line sets up this as follows:
                obj.method.call(obj, 'a');

            // #### 25.4.2.2 Functions and .call()
                // If you function-call an ordinary function, its implicit parameter this is also provided – it is implicitly set to undefined:
                function func(x) {
                    assert.equal(this, undefined); // implicit parameter
                    assert.equal(x, 'a');
                }
                func('a');
                
                // The method call in the last line sets up this as follows:
                func.call(undefined, 'a');
                
                // this being set to undefined during a function call, indicates that it is a feature that is only needed during a method call.

            // #### Function borrowing:
                // Example: we can use a method from object1 to log something from object2
                const person1 = {
                    first: 'Jane',
                    last: 'Doe',
                    getFullName: function() {
                        return `${this.first} ${this.last}`;
                    }
                };

                const person2 = {
                    first: 'Ben',
                    last: 'Derek'
                }
                person1.getFullName.call(person2);
                // Ben Derek


        // ### 25.4.3 .bind(): pre-filling this and parameters of functions
            // .bind() is another method of function objects. This method is invoked as follows:
            const boundFunc = someFunc.bind(thisValue, arg1, arg2);

            // That is, the following two function calls are equivalent:
            boundFunc('a', 'b')
            someFunc.call(thisValue, arg1, arg2, 'a', 'b')

            // .bind() returns a NEW FUNCTION boundFunc(). Calling that function invokes someFunc() with this set to thisValue and these parameters: arg1, arg2, followed by the parameters of boundFunc().

            // We need to use .bind() or arrow function to extract a method 
            // Example 1
                const person = {
                    first: 'Jane',
                    last: 'Doe',
                    getFullName: function() {
                        return `${this.first} ${this.last}`;
                    }
                };
                
                const logName = function(lang1, lang2) {
                    return `Logged: ${this.getFullName()}`;
                }
                logName();
                assert.throws(() => logName(), undefined);

                // To solve this issue we bind the object:
                const logName = function(lang1, lang2) {
                    return `Logged: ${this.getFullName()}`; // here 'this' will be the object 'person'
                } // .bind(person); bind the object person directly
                logName();

                // or
                const logFullName = logName.bind(person);
                assert.equal(logFullName(), 'Logged: Jane Doe')

                // or we can use call() method (without bind()) to bind the object with arguments
                logName.call(person, 'en', 'fr');
                // Jone Doe
                // en fr

            // Example 2
                const person = {
                first: 'Jane',
                says: function(text) {
                    return `${this.first} says ${text}`;
                }
                };
                //const jane = person.says.bind(person);
                
                // or with arrow function 
                const jane = (text) => person.says(text);


            // #### 25.4.3.1 An alternative to .bind()
                // Another way of pre-filling this and parameters is via an arrow function:
                const boundFunc2 = (...args) =>
                    someFunc.call(thisValue, arg1, arg2, ...args);

            // #### 25.4.3.2 An implementation of .bind()
                // Considering the previous section, .bind() can be implemented as a real function as follows:
                function bind(func, thisValue, ...boundArgs) {
                    return (...args) =>
                        func.call(thisValue, ...boundArgs, ...args);
                }

            // #### Function currying: Creat a copy of a function but with some preset parameters
                // Example:
                function multiply(a, b) {
                    return a * b;
                }
                const multiplyByTwo = multiply.bind(this, 2);
                multiplyByTwo(4);
                // 8

                // the line above is like we write like this:
                /*function multiplyByTwo(b) {
                    const a = 2;
                    return a * b;
                } */

        // ### 25.4.5 this pitfall: accidentally shadowing this
            // Note: Accidentally shadowing this is only an issue with ordinary functions

            const prefixer = {
                prefix: '==> ',
                prefixStringArray(stringArray) {
                  return stringArray.map(
                    function (x) {
                        return this.prefix + x; // (A)
                    });
                },
            };
            assert.throws(
                () => prefixer.prefixStringArray(['a', 'b']),
                /^TypeError: Cannot read property 'prefix' of undefined$/);

            // In line A, we want to access the this of .prefixStringArray(). But we can’t since the surrounding ordinary function has its own this that shadows (blocks access to) the this of the method. The value of the former this is undefined due to the callback being function-called. That explains the error message.

            // There are some solutions to solve this issue 
                // 1. The simplest way to fix this problem is via an arrow function, which doesn’t have its own this and therefore doesn’t shadow anything:
                    prefixStringArray(stringArray) {
                      return stringArray.map(
                        (x) => {
                            return this.prefix + x;
                        });
                    },

                // 2. Another option is to specify a fixed this for the callback via .bind() (line A):
                    prefixStringArray(stringArray) {
                    return stringArray.map(
                        function (x) {
                            return this.prefix + x;
                        }.bind(this)); // (A)
                    },

        // ### 25.4.6 Avoiding the pitfalls of this
            // One simple rule helps avoid the second pitfall:
                // “Avoid the keyword function”: Never use ordinary functions, only arrow functions (for real functions) and method definitions.


    // ## 25.5 Objects as dictionaries (advanced)
    // ======================================
        // Objects work best as records. But before ES6, JavaScript did not have a data structure for dictionaries (ES6 brought Maps).
        // Note: Use Maps if you can.

        // ### 25.5.1 Arbitrary fixed strings as property keys
            // So far, we have always used objects as RECORDS. Property keys were fixed tokens that had to be valid identifiers and internally became strings:

            const obj = {
                mustBeAnIdentifier: 123,
            };
            
            // Get property
            assert.equal(obj.mustBeAnIdentifier, 123);
            
            // Set property
            obj.mustBeAnIdentifier = 'abc';
            assert.equal(obj.mustBeAnIdentifier, 'abc')

            // As a next step, we’ll go beyond this limitation for property keys:
            // Two techniques allow us to use arbitrary strings as property keys.
                // First, when creating property keys via object literals, we can quote property keys (with single or double quotes):
                    const obj = {
                        'Can be any string!': 123,
                    };

                // Second, when getting or setting properties, we can use square brackets with strings inside them:
                    // Get property
                    assert.equal(obj['Can be any string!'], 123);

                    // Set property
                    obj['Can be any string!'] = 'abc';
                    assert.equal(obj['Can be any string!'], 'abc');

                    // You can also use these techniques for methods:
                    const obj = {
                        'A nice method'() {
                            return 'Yes!';
                        },
                    };
                    assert.equal(obj['A nice method'](), 'Yes!');

        // ### 25.5.2 Computed property keys
            // The syntax of dynamically computed property keys in object literals is inspired by dynamically accessing properties. That is, we can use square brackets to wrap expressions:
            
            // * Computed property keys are stringified – unless they are symbols.

            // Computed property names (ES2015)
                let i = 0
                let a = {
                    ['foo' + ++i]: i,
                    ['foo' + ++i]: i,
                }
                console.log(a.foo1) // 1
                console.log(a.foo2) // 2

                let param = 'size'
                let config = {
                    [param]: 12,
                    ['mobile' + param.charAt(0).toUpperCase() + param.slice(1)]: 4,
                    [Symbol.toStringTag]: 'Goodbye', // (A)
                }
                console.log(config) // {size: 12, mobileSize: 4}
                
                // The main use case for computed keys is having symbols as property keys (line A).

            // 1 Computed property keys
                const foo = 'bar';
                const obj = {
                    foo: 'a',
                    [foo]: 'b'
                };

                obj // become as follow
                const obj = {
                    foo: 'a',
                    bar: 'b'
                };

                const result = obj['foo']; // 'a'
                const result = obj.foo; // 'a'
                const result = obj.bar; // 'b'
                const result = obj[foo]; // 'b'
                const result = obj['bar']; // 'b'
                const result = obj[bar]; // The variable bar does not exist.
                

        // ### 25.5.3 The in operator: is there a property with a given key?
            // The in operator checks if an object has a property with a given key:
            const obj = {
                foo: 'abc',
                bar: false,
            };
              
            assert.equal('foo' in obj, true);
            assert.equal('unknownKey' in obj, false);

            // #### 25.5.3.1 Checking if a property exists via truthiness
                // Warning: However, one important caveat: truthiness checks fail if the property exists, but has a falsy value (undefined, null, false, 0, "", etc.):
                assert.equal(obj.foo ? 'exists' : 'does not exist', 'exists');

        // ### 25.5.4 Deleting properties
            // You can delete properties via the delete operator:
            const obj = {
                foo: 123,
            };
            assert.deepEqual(Object.keys(obj), ['foo']);
              
            delete obj.foo;
            assert.deepEqual(Object.keys(obj), []);

        // ### 25.5.5 Listing property keys
            // Table 18: Standard library methods for listing own (non-inherited) property keys. All of them return Arrays with strings and/or symbols.
                                            enumerable	non-e.	string	symbol
            Object.keys()	                ✔		            ✔	
            Object.getOwnPropertyNames()	✔	        ✔	    ✔	
            Object.getOwnPropertySymbols()	✔	        ✔		        ✔
            Reflect.ownKeys()	            ✔	        ✔	    ✔	    ✔
            
        // ### 25.5.6 Listing property values via Object.values()
            // Object.values() lists the values of all enumerable properties of an object:
            const obj = {foo: 1, bar: 2};
            assert.deepEqual(Object.values(obj), [1, 2]);
           
        // ### 25.5.7 Listing property entries via Object.entries()
            // Object.entries() lists key-value pairs of enumerable properties. Each pair is encoded as a two-element Array:
            const obj = {foo: 1, bar: 2};
            assert.deepEqual(
                Object.entries(obj),
                [
                    ['foo', 1],
                    ['bar', 2],
                ]
            );
            
        // ### 25.5.9 Assembling objects via Object.fromEntries()
            // Given an iterable over [key, value] pairs, Object.fromEntries() creates an object:
            
            // Object.fromEntries() does the opposite of Object.entries().
            assert.deepEqual(
                Object.fromEntries([['foo',1], ['bar',2]]),
                {
                    foo: 1,
                    bar: 2,
                }
            );

            // #### 25.5.9.1 Example: pick(object, ...keys) from the underscore
                // pick returns a copy of object that only has those properties whose keys are mentioned as arguments:
                const address = {
                    street: 'Evergreen Terrace',
                    number: '742',
                    city: 'Springfield',
                    state: 'NT',
                    zip: '49007',
                };
                  assert.deepEqual(
                    pick(address, 'street', 'number'),
                    {
                        street: 'Evergreen Terrace',
                        number: '742',
                    }
                );

                function pick(object, ...keys) {
                    const filteredEntries = Object.entries(object)
                        .filter(([key, _value]) => keys.includes(key));
                    return Object.fromEntries(filteredEntries);
                }

            // #### 25.5.9.2 Example: invert(object)
                // invert returns a copy of object where the keys and values of all properties are swapped:

                function invert(object) {
                  const mappedEntries = Object.entries(object)
                        .map(([key, value]) => [value, key]);
                    return Object.fromEntries(mappedEntries);
                }

                assert.deepEqual(
                    invert({a: 1, b: 2, c: 3}),
                    {1: 'a', 2: 'b', 3: 'c'}
                );

    // ## 25.7 Advanced topics
    // =============================

        // ### 25.7.2 Freezing objects
            // Object.freeze(obj) makes obj completely immutable: You can’t change properties, add properties, or change its prototype
            const frozen = Object.freeze({ x: 2, y: 5 });
            assert.throws(
                () => { frozen.x = 7 },
                {
                name: 'TypeError',
                message: /^Cannot assign to read only property 'x'/,
            });

            // There is one caveat: Object.freeze(obj) freezes shallowly. That is, only the properties of obj are frozen but not objects stored in properties.









