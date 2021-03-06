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


        // ### 26.1.6 Object prototypes
            // Create with prototype
            function Person(name, age = 16, gender = 'male', interests) {
                this.name = name;
                this.age = age;
                this.gender = gender === 'male' ? 'He' : 'She';
                this.interests = interests;
            }
            
            Person.prototype.bio = function() {
                let string = '';
                this.interests.forEach((value, index) => {
                    if(index === this.interests.length - 1) {
                        string += `and ${value}.`;
                    } else {
                        string += `${value}, `;
                    }
                });
                return `${this.name} has ${this.age} yers old. ${this.gender} likes ${string}`;
            };
            
            const person1 = new Person('Andrew', 18, 'male', ['Sport', 'Music', 'Swiming']);
            console.log(person1.greeting()); // Hi! I'm Andrew
            console.log(person1.bio()); // Andrew has 18 yers old. He likes Sport, Music, and Swiming.


            // #### 26.1.6.1 Modifying prototypes
                // This is really useful, but what is even more useful is that the whole inheritance chain has updated dynamically, automatically making this new method available on all object instances derived from the constructor.
                Person.prototype.greeting = function() {
                    return `Hi! I'm ${this.name}`;
                };
                
                // If you try to define properties on the prototype property with this, this doesn't work. That's because this will be referencing the global scope in this case, not the function scope. 
                // This worked fine on the method we defined earlier in the prototype because it is sitting inside a function scope, which will be transferred successfully to the object instance scope.
                Person.prototype.fullName = this.name;
                console.log(person1.fullName); // undefined

                // Solution - generally it works better to define properties inside the constructor.
                // In fact, a fairly common pattern for more object definitions is to define the properties inside the constructor, and the methods on the prototype. This makes the code easier to read, as the constructor only contains the property definitions, and the methods are split off into separate blocks. 

                // For example of pattern:
                // This pattern can be seen in action in Piotr Zalewa's school plan app on GitHub

                // Constructor with property definitions
                function Test(a, b, c, d) {
                    // property definitions
                }
                
                // First method definition
                Test.prototype.x = function() { ... };
                
                // Second method definition
                Test.prototype.y = function() { ... };


            console.log(person1.valueOf());
            // This method — Object.valueOf() is inherited by person1 because its constructor is Person(), and Person()'s prototype is Object(). valueOf() returns the value of the object it is called on.

            // * The browser initially checks to see if the person1 object has a valueOf() method available on it, as defined on its constructor, Person().
            // * It doesn't, so the browser then checks to see if the Person() constructor's prototype object (Object()) has a valueOf() method available on it. It does, so it is called, and all is good!

            // Before ES6 it was possible to access an object's prototype via use __proto__
            console.log(person1.__proto__); // constructor: ƒ Person(name, age = 16, gender = 'male', interests)
            console.log(person1.__proto__.__proto__); // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}

            // Since ES6 it's possible to access an object's prototype directly via 
            Object.getPrototypeOf(obj)

            // #### 26.1.6.2 The prototype property: Where inherited members are defined
                console.log(Person.prototype); // constructor: ƒ Person(name = 'Chris')
                console.log(Date.prototype); // {constructor: ƒ, toString: ƒ, toDateString: ƒ, toTimeString: ƒ, toISOString: ƒ, …}
                console.log(String.prototype); // String {"", constructor: ƒ, anchor: ƒ, big: ƒ, blink: ƒ, …}
                console.log(Array.prototype); // [constructor: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]
            
            // #### 26.1.6.3 Check the constructor property
                // Every constructor function has a prototype property whose value is an object containing a constructor property. This constructor property points to the original constructor function.
                const person1 = new Person();
                console.log(person1.constructor); // Person(name = 'Chris') {...

                const person2 = Object.create(person1);
                console.log(person2.constructor); // Person(name = 'Chris') {...
                
                //  If you have an object instance and you want to return the name of the constructor
                console.log(person2.constructor.name); // Person
                console.log(person2 instanceof Person); // true

                // Get properties of prototype
                console.log(Object.getOwnPropertyNames(Person.prototype));


        // ### 26.1.7 Prototypal inheritance
            // Class parent 
            function Person(name, age = 16, gender = 'male', interests) {
                this.name = name;
                this.age = age;
                this.gender = gender === 'male' ? 'He' : 'She';
                this.interests = interests;
            }

            Person.prototype.bio = function() {
                let string = '';
                this.interests.forEach((value, index) => {
                    if(index === this.interests.length - 1) {
                        string += `and ${value}.`;
                    } else {
                        string += `${value}, `;
                    }
                });
                return `${this.name} has ${this.age} yers old. ${this.gender} likes ${string}`;
            };

            Person.prototype.greeting = function() {
                return `Hi! I'm ${this.name}`;
            };

            // Create a teacher class, than inherit form Person class
            function Teacher(name, age = 36, gender = 'female', interests, subject) {
                Person.call(this, name, age, gender, interests);
                this.subject = subject;
            }
            // call() function basically allows you to call a function defined somewhere else, but in the current context. The first parameter specifies the value of this that you want to use when running the function.
            // We want the Teacher() constructor to take the same parameters as the Person() constructor it is inheriting from, so we specify them all as parameters in the call() invocation.

            // We need to get Teacher() to inherit the methods defined on Person()'s prototype.
            Teacher.prototype = Object.create(Person.prototype);
            Teacher.prototype.constructor = Teacher; // or use defineProperty()

            // Define a new greeting() function on the Teacher() constructor.
            Teacher.prototype.greeting = function() {
                return `Hello! My name is ${this.name}, and I teach ${this.subject}.`;
            }

            const teacher1 = new Teacher('Kio', null, null, ['Dancing', 'Films'], 'Programming');
            console.log(teacher1.greeting()); // Hello! My name is Kio, and I teach Programming.

            // #### 26.1.7.1 Inheriting from a constructor with no parameters
                function Brick() {
                    this.width = 10;
                    this.height = 20;
                }

                function BlueGlassBrick() {
                    Brick.call(this);
                  
                    this.opacity = 0.5;
                    this.color = 'blue';
                }


    // ## 26.2 Classes
    // ===============================
        // All classes are functions
        // Note - Under the hood, your classes are being converted into Prototypal Inheritance models — this is just syntactic sugar.
        
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
        // For sub-classes, the this intialization to a newly allocated object is always dependant on the parent class constructor, i.e the constructor function of the class from which you're extending.

        // Here we are extending the Person class — the Employee sub-class is an extension of the Person class. So for Employee, the this initialization is done by the Person constructor.

        // To call the parent constructor we have to use the super() operator.

        // Since the super() operator is actually the parent class constructor, passing it the necessary arguments of the Parent class constructor will also initialize the parent class properties in our sub-class.
        
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
