// ============================
// 10 Variables and assignment
// ============================
    //## 10.1 let - Variables declared via let are mutable:
    // ============================

    //## 10.2 const
    // Variables declared via const are immutable. You must always initialize immediately:
    // ============================

        //### 10.2.1 const
            const i = 0; // must initialize

            // In JavaScript, const only means that the binding (the association between variable name and variable value) is immutable. The value itself may be mutable, like obj or array in the following example.

            const obj = { prop: 0 };
            // Allowed: changing properties of `obj`
            obj.prop = obj.prop + 1;

            // Not allowed: assigning to `obj`
            obj = {}

        //### 10.2.2 const and loops
            // You can use const with for-of loops, where a fresh binding is created for each iteration:
            const arr = ['hello', 'world'];
            for (const elem of arr) {
                console.log(elem);
            }


    //## 10.4 The scope of a variable
    // The scope of a variable is the region of a program where it can be accessed. Consider the following code.
    // ============================
        { // Scope A. Accessible: x
            const x = 0;
            assert.equal(x, 0);
            { // Scope B. Accessible: x, y
              const y = 1;
              assert.equal(x, 0);
              assert.equal(y, 1);
              { // Scope C. Accessible: x, y, z
                const z = 2;
                assert.equal(x, 0);
                assert.equal(y, 1);
                assert.equal(z, 2);
              }
            }
        }
        // Outside. Not accessible: x, y, z
        console.log(x); // x is not defined

        //### 10.4.1 Shadowing variables
        // You can, nest a block and use the same variable name x that you used outside the block:

        const x = 1;
        assert.equal(x, 1);
        {
          const x = 2;
          assert.equal(x, 2);
        }
        assert.equal(x, 1);
        
        // Inside the block, the inner x is the only accessible variable with that name. The inner x is said to shadow the outer x. Once you leave the block, you can access the old value again.


    //## 10.5 (Advanced)
    // ============================

    //## 10.9 Closures
    // ============================
        // ### 10.9.1 Bound variables vs. free variables
        // * Bound variables are declared within the scope. They are parameters and local variables.
        // * Free variables are declared externally. They are also called non-local variables.

        function func(x) {
          const y = 123;
          console.log(z);
        }
        // In the body of func(), x and y are bound variables. z is a free variable.

        // What is a closure then?
          // A closure is a function plus a connection to the variables that exist at its “birth place”.

          // Example
          function brand(brand) {
            console.log(brand);
            return function(model) {
              console.log(`I like ${brand}, special ${model}`);
            }
          }
          // brand('Audi'); // Audi
          const bestCar = brand('Audi');
          bestCar('A4'); // I like Audi, special A4

          // or we can call like that:
          brand('Audi')('A4'); // I like Audi, special A4


          // We can go deeper
          function brand(brand) {
            console.log(brand);
            return function(model) {
              console.log(`I like ${brand}, special ${model}`);
              return function(specs) {
                console.log(`I like ${brand}, special ${model} because it's ${specs}`);
              }
            }
          }
          // brand('Audi'); // Audi
          const brandCar = brand('Audi');
          // brandCar('A4'); // I like Audi, special A4, 
          const bestCar = brandCar('A4');
          bestCar('fast'); // I like Audi, special A4 because it's fast


    // ## 11.4 Primitive values vs. objects
    // ============================
      // Primitive values: are atomic building blocks of data in JavaScript.
        // They are passed by value: when primitive values are assigned to variables or passed to functions, their contents are copied.
        // They are compared by value: when comparing two primitive values, their contents are compared.
      // Objects: are compound pieces of data.
        // They are passed by identity (my term): when objects are assigned to variables or passed to functions, their identities (think pointers) are copied.
        // They are compared by identity (my term): when comparing two objects, their identities are compared.

        // By default, you can freely change, add, and remove the properties of objects:
        const obj = {};
        
        obj.foo = 'abc'; // add a property
        assert.equal(obj.foo, 'abc');
        
        obj.foo = 'def'; // change a property
        assert.equal(obj.foo, 'def');

        // ### 11.4.2.2 Objects are passed by identity
          // When assigning an object to a variable or passing it as an argument to a function, its identity is copied. Each object literal creates a fresh object on the heap and returns its identity.
          
          const a = {}; // fresh empty object
          // Pass the identity in `a` to `b`:
          const b = a;

          // Now `a` and `b` point to the same object
          // (they “share” that object):
          assert.equal(a === b, true);

          // Changing `a` also changes `b`:
          a.foo = 123;
          assert.equal(b.foo, 123);

          // ### 11.4.2.3 Objects are compared by identity
            // Objects are compared by identity (my term): two variables are only equal if they contain the same object identity. They are not equal if they refer to different objects with the same content.

            const obj = {}; // fresh empty object
            assert.equal(obj === obj, true); // same identity
            assert.equal({} === {}, false); // different identities, same content


    // ## 11.5 The operators typeof and instanceof: what’s the type of a value?
    // ============================
      // The two operators typeof and instanceof let you determine what type a given value x has:

      if (typeof x === 'string') ···
      if (x instanceof Array) ···
        // * typeof distinguishes the 7 types of the specification (minus one omission, plus one addition).
        // * instanceof tests which class created a given value.

        // Rule of thumb: typeof is for primitive values; instanceof is for objects

        // Table 2: The results of the typeof operator.
        x	                 typeof x
        undefined	        'undefined'
        null	            'object'
        Boolean	          'boolean'
        Number	          'number'
        String	          'string'
        Symbol	          'symbol'
        Function	        'function'
        All other objects	'object'

          // ### 11.5.2 instanceof
            // This operator answers the question: has a value x been created by a class C?
            x instanceof C

            // For example:
            > (function() {}) instanceof Function
            true
            > ({}) instanceof Object
            true
            > [] instanceof Array
            true

            // Primitive values are not instances of anything:
            > 123 instanceof Number
            false
            > '' instanceof String
            false
            > '' instanceof Object
            false

    // ## 11.7 Converting between types
    // ============================
      // ### 11.7.1 Explicit conversion between types
        // The function associated with a primitive type explicitly converts values to that type:
        Boolean(0)
        false
        Number('123')
        123
        String(123)
        '123'
        
        // You can also use Object() to convert values to objects:
        typeof Object(123)
        'object'

      // ### 11.7.2 Coercion (automatic conversion between types)
        // For example, the multiplication operator coerces its operands to numbers:
        '7' * '3'
        21
        
        // Many built-in functions coerce, too. For example, parseInt() coerces its parameter to string (parsing stops at the first character that is not a digit):
        parseInt(123.45)
        123
        