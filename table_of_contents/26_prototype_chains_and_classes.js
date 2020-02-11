// =================================
// 26 Prototype chains and classes
// =================================
    
    // ## 26.1 Prototype chains
    // ================================ 
        // Prototypes are JavaScript’s only inheritance mechanism: each object has a prototype that is either null or an object
        
        // In an object literal, you can set the prototype via the special property __proto__:
        const proto = {
            protoProp: 'a',
        };
          const obj = {
            __proto__: proto,
            objProp: 'b',
        };
        
        assert.equal(obj.protoProp, 'a');
        assert.equal('protoProp' in obj, true);

        obj
        {objProp: "b"}
            objProp: "b"
                __proto__: 
                protoProp: "a"
                    __proto__: Object

        // Method call() get value to the property of the targeted object
        const proto = {
            foo: 'p',
            logFoo() {
                console.log(this.foo);
            }
        };
        const obj = {
            foo: 'o',
            __proto__: proto,  
        };

        proto.logFoo.call(obj);
        // 'o'
        proto.logFoo.call(proto);
        // 'p'

        // Non-inherited properties are called own properties. obj has one own property, .objProp.

        // ### 26.1.2 Pitfall: only the first member of a prototype chain is mutated
            // One aspect of prototype chains that may be counter-intuitive is that setting any property via an object – even an inherited one – only changes that current object – never one of the prototypes.

            const proto = {
                protoProp: 'a',
            };
              const obj = {
                __proto__: proto,
                objProp: 'b',
            };

            // In the beginning, obj has one own property
            assert.deepEqual(Object.keys(obj), ['objProp']);

            obj.protoProp = 'x'; // (A)
            // We created a new own property:
            assert.deepEqual(Object.keys(obj), ['objProp', 'protoProp']);

            // The inherited property itself is unchanged:
            assert.equal(proto.protoProp, 'a');

            // The own property overrides the inherited property:
            assert.equal(obj.protoProp, 'x');

            // The own property .protoProp of obj overrides the property inherited from proto.

        // ### 26.1.3 Tips for working with prototypes (advanced)
            // Best practice: avoid __proto__, except in object literals

            // The recommended ways of getting and setting prototypes are:
                // * The best way to GET a prototype is via the following method:
                Object.getPrototypeOf(obj: Object) : Object

                // * The best way to SET a prototype is when creating an object – via __proto__ in an object literal or via:
                Object.create(proto: Object) : Object

                // * Change the prototype of an existing object. But that may affect performance negatively.
                Object.setPrototypeOf(obj: Object, proto: Object) : Object


            // This is how these features are used:
                const proto1 = {};
                const proto2 = {};
                
                const obj = Object.create(proto1);
                assert.equal(Object.getPrototypeOf(obj), proto1);
                
                Object.setPrototypeOf(obj, proto2);
                assert.equal(Object.getPrototypeOf(obj), proto2);

            // #### 26.1.3.2 Check: is an object a prototype of another one?
                // So far, “p is a prototype of o” always meant “p is a direct prototype of o”.

                const a = {};
                const b = {__proto__: a};
                const c = {__proto__: b};
                
                assert.equal(a.isPrototypeOf(b), true);
                assert.equal(a.isPrototypeOf(c), true);
                
                assert.equal(a.isPrototypeOf(a), false);
                assert.equal(c.isPrototypeOf(a), false);

        // ### 26.1.4 Sharing data via prototypes
            const jane = {
                name: 'Jane',
                describe() {
                    return 'Person named '+this.name;
                },
            };
            const tarzan = {
                name: 'Tarzan',
                describe() {
                    return 'Person named '+this.name;
                },
            };

            // We can move it to an object PersonProto and make that object a prototype of both jane and tarzan:
                const PersonProto = {
                    describe() {
                    return 'Person named ' + this.name;
                    },
                };
                const jane = {
                    __proto__: PersonProto,
                    name: 'Jane',
                };
                const tarzan = {
                    __proto__: PersonProto,
                    name: 'Tarzan',
                };

        // ### 26.1.5 Constructors and object instances
            // JavaScript uses special functions called CONSTRUCTOR FUNCTIONS to define and initialize objects and their features.

            // Note!!! that when we are calling our constructor function, we are defining greeting() every time, which isn't ideal. To avoid this, we can define functions on the prototype instead. 
            // To be exact, the properties and methods are defined on the prototype property on the Objects' constructor functions, not the object instances themselves.
            
            // 1. Create with a normal function
            function person(name) {
                const obj = {};
                obj.name = name;
                obj.greeting = function() {
                    return `Hi! I'm ${this.name}`;
                };
                return obj;
            }
            const person1 = person('John');
            console.log(person1.greeting());


            // 2. Create with a constructor function
                // If we know we want to create an object, why do we need to explicitly create a new empty object and return it? JavaScript provides us with a handy shortcut, in the form of constructor functions
            function Person(name) {
                this.name = name;
                this.greeting = function() {
                    return `Hi! I'm ${this.name}`;
                };
            }
            const person1 = new Person('John');


            // 3. The Object() constructor
            const person1 = new Object();
            person1.name = 'Chris';
            person1.greeting = function(){};

            // Or we can also pass an object literal to the Object() constructor as a parameter, to prefill it with properties/methods.
            const person1 = new Object({
                name: 'Chris',
                greeting: function(){},
            });
            console.log(person1.greeting()); // Hi Chris


            // 4. Using the create() method
            // Create object instances without first creating constructors, especially if they are creating only a few instances of an object. JavaScript has a built-in method called create() that allows you to do that. With it, you can create a new object based on any existing object.
            function Person(name = 'Chris') {
                this.name = name;
                this.greeting = function() {
                    return `Hi ${this.name}`;
                };
            };
            const person1 = new Person();
            console.log(person1.greeting()); // Hi Chris
            
            // Now create person2 based on person1. It has the same properties and methods.
            const person2 = Object.create(person1);
            person2.name = 'Andrew';
            console.log(person2.greeting()); // Hi Andrew



    // ## 26.2 Classes
    // ===============================
        // All classes are functions
        
        // ### 26.2.1 A class for persons
            // We have previously worked with jane and tarzan, single objects representing persons. Let’s use a class declaration to implement a factory for person objects:
            
            class Person {
                constructor(name) {
                    this.name = name;
                }
                describe() {
                    return 'Person named '+this.name;
                }
            }

            // jane can now be created via new Person():
            const jane = new Person('Jane');
            assert.equal(jane.name, 'Jane');
            assert.equal(jane.describe(), 'Person named Jane');

            // * The normal method .describe()
            // * The special method .constructor() which is called directly after a new instance has been created and initializes that instance. 
                // If you don’t need any arguments to set up a new instance, you can omit the constructor.

            // #### 26.2.1.1 Class expressions
                // There are two kinds of class definitions (ways of defining classes):
                    // * Class declarations, which we have seen in the previous section.
                    // * Class expressions, which we’ll see next.

                // Class expressions can be anonymous and named:
                    // Anonymous class expression
                    const Person = class { ··· };
                    
                    // Named class expression
                    const Person = class MyClass { ··· };

        // ### 6.2.2 Classes under the hood
            // Figure 13: The class Person has the property .prototype that points to an object that is the prototype of all instances of Person. jane is one such instance.

            // The main purpose of class Person is to set up the prototype chain on the right (jane, followed by Person.prototype). It is interesting to note that both constructs inside class Person (.constructor and .describe()) created properties for Person.prototype, not for Person.

            // It is easy to confuse .__proto__ and .prototype. Hopefully, fig. 13 makes it clear how they differ:
                // * .__proto__ is a pseudo-property for accessing the prototype of an object.
                // * .prototype is a normal property that is only special due to how the new operator uses it. The name is not ideal: Person.prototype does not point to the prototype of Person, it points to the prototype of all instances of Person.

        // ### 26.2.4 Class definitions: static properties
            class Bar {
                static staticMethod() {
                    return 'staticMethod';
                }
                static get staticGetter() {
                    return 'staticGetter';
                }
            }

            // The static method and the static getter are used as follows:
            Bar.staticMethod()
            'staticMethod'
            Bar.staticGetter
            'staticGetter'

        // Example: Create an instance with an optional parameter. Throw an error when array is empty.
            export class Queue {
                constructor() {
                    this._data = [];
                }
                get length() {
                    return this._data.length;
                }
                enq(value) {
                    this._data.push(value);
                }
                deq() {
                    if(this.length === 0) {
                        throw new Error('Queue is empty');
                    }
                    return this._data.shift();
                }
            }

            test('Using a queue', t => {
                const queue = new Queue();
                assert.equal(queue.length, 0);
                
                queue.enq('a');
                queue.enq('b');
                assert.equal(queue.length, 2);
                
                assert.equal(queue.deq(), 'a');
                assert.equal(queue.deq(), 'b');
                assert.equal(queue.length, 0);
                
                assert.throws(
                    () => queue.deq(),
                    { message: 'Queue is empty' });
            });

    // ## 26.3 Private data for classes
    // ==================================
        // We discuss them in the context of classes, but they also work for objects created directly, e.g., via object literals.

        // ### 26.3.1 Private data: naming convention
            // The first technique makes a property private by prefixing its name with an underscore. 
            // This doesn’t protect the property in any way; it merely signals to the outside: “You don’t need to know about this property.”

            // In the following code, the properties ._counter and ._action are private.
            class Countdown {
                constructor(counter, action) {
                    this._counter = counter;
                    this._action = action;
                }
                dec() {
                    this._counter--;
                    if (this._counter === 0) {
                        this._action();
                    }
                }
            }

            // The two properties aren’t really private:
            assert.deepEqual(
                Object.keys(new Countdown()),
                ['_counter', '_action']);

        // ### 26.3.2 Private data: WeakMaps
            // Another technique is to use WeakMaps.

            const _counter = new WeakMap();
            const _action = new WeakMap();

            class Countdown {
                constructor(counter, action) {
                    _counter.set(this, counter);
                    _action.set(this, action);
                }
                dec() {
                    let counter = _counter.get(this);
                    counter--;
                    _counter.set(this, counter);
                    if (counter === 0) {
                        _action.get(this)();
                    }
                }
            }

            // The two pseudo-properties are truly private:
            assert.deepEqual(
                Object.keys(new Countdown()),
            []);

    // ## 26.4 Subclassing
    // ==============================
        class Person {
            constructor(name) {
                this.name = name;
            }
            describe() {
                return `Person named ${this.name}`;
            }
            static logNames(persons) {
                for (const person of persons) {
                    console.log(person.name);
                }
            }
        }

        class Employee extends Person {
            constructor(name, title) {
              super(name);
              this.title = title;
            }
            describe() {
                return super.describe() + ` (${this.title})`;
            }
        }

        const jane = new Employee('Jane', 'CTO');
        assert.equal(jane.describe(), 'Person named Jane (CTO)');

        // * Inside a .constructor() method, you must call the super-constructor via super() before you can access this. That’s because this doesn’t exist before the super-constructor is called (this phenomenon is specific to classes).
        
        // * Static methods are also inherited. For example, Employee inherits the static method .logNames():
            'logNames' in Employee // true

        // Starting with ES6, you can subclass Arrays. Subclasses work as expected.
