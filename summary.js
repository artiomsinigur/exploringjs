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


  // ============================
  // # 11 Values
  // ============================
  
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


  // =============================
  // 12 Operators
  // =============================

      // ### 12.1.1 Operators coerce(force) their operands to appropriate types
        // First, the multiplication operator can only work with numbers. Therefore, it converts strings to numbers before computing its result.
        '7' * '3' // 21
        
        const result = [6] * [6]; // 36
        // Step 1: convert [6] to a primitive value:
        // String([6]); // '6'

        // Second, the square brackets operator ([ ]) for accessing the properties of an object can only handle strings and symbols. All other values are coerced to string:
        const obj = {};
        obj['true'] = 123;

        // Coerce true to the string 'true'
        assert.equal(obj[true], 123);

      // ### 12.1.2 Most operators only work with primitive values
        // Most operators only work with primitive values. If an operand is an object, it is usually coerced to a primitive value – for example:
        [1,2,3] + [4,5,6]
        '1,2,34,5,6'

        // Why? The plus operator first coerces its operands to primitive values:
        String([1,2,3])
        '1,2,3'
        String([4,5,6])
        '4,5,6'

        // Next, it concatenates the two strings:
        '1,2,3' + '4,5,6'
        '1,2,34,5,6'

    // ## 12.2 The plus operator (+)
    // ============================
      // First, it converts both operands to primitive values. Then it switches to one of two modes:
      // * String mode: If one of the two primitive values is a string, then it converts the other one to a string, concatenates both strings, and returns the result.
      // * Number mode: Otherwise, It converts both operands to numbers, adds them, and returns the result.
      
      // Number mode means that if neither operand is a string (or an object that becomes a string) then everything is coerced to numbers:
      4 + true
      // 5
      Number(true) is 1

    // ## 12.4 Equality: == vs. ===
    // ============================
      // JavaScript has two kinds of equality operators: 
        // * loose equality (==) 
        // * strict equality (===). 
      //The recommendation is to always use the latter.

      // ### 12.4.1 Loose equality (== and !=)
        > '123' == 123
        true
        > false == 0
        true

        // Others less so:
        > '' == 0 // typeof '' are 'string' | and typeof 0 are 'number'
        true
        
        // Objects are coerced to primitives if (and only if!) the other operand is primitive:
        > [1, 2, 3] == '1,2,3'
        true
        > ['1', '2', '3'] == '1,2,3'
        true

        // If both operands are objects, they are only equal if they are the same object:
        > [1, 2, 3] == ['1', '2', '3']
        false
        > [1, 2, 3] == [1, 2, 3]
        false

        const arr = [1, 2, 3];
        arr == arr
        true
        
        // Lastly, == considers undefined and null to be equal:
        > undefined == null
        true

      // ### 12.4.2 Strict equality (=== and !==)
        // Strict equality never coerces. 
        // Two values are only equal if they have the same type. 
        // Let’s revisit our previous interaction with the == operator and see what the === operator does:

        > false === 0
        false
        > '123' === 123
        false

        // An object is only equal to another value if that value is the same object:
        > [1, 2, 3] === '1,2,3'
        false
        > ['1', '2', '3'] === '1,2,3'
        false
        
        > [1, 2, 3] === ['1', '2', '3']
        false
        > [1, 2, 3] === [1, 2, 3]
        false
        
        const arr = [1, 2, 3];
        arr === arr
        true

        // The === operator does not consider undefined and null to be equal:
        > undefined === null
        false

      // ### 12.4.3 Recommendation: always use strict equality
        // Let’s look at two use cases for == and what I recommend to do instead.
        
        // Use case for comparing with a number or a string
        if (x == 123) {
          // x is either 123 or '123'
        }

        // I prefer either of the following two alternatives:
        if (x === 123 || x === '123') ···
        
        // You can also convert x to a number when you first encounter it.
        if (Number(x) === 123) ···

        // Use case for comparing with undefined or null

        // Another use case for == is to check if a value x is either undefined or null:
        if (x == null) {
          // x is either null or undefined
        }

        // I prefer either of the following two alternatives:
        if (x === undefined || x === null) ···
        if (!x) ···

        // 12.4.4 Even stricter than ===: Object.is()
          // Method Object.is() compares two values:
          Object.is(123, 123)
          true
          Object.is(123, '123')
          false


  // ========================
  // 13 The non-values undefined and null
  // ========================

    // ## 13.1 undefined vs. null
    // =========================
      // The language itself makes the following distinction:
      // * undefined means “not initialized” (e.g., a variable) or “not existing” (e.g., a property of an object).
      // * null      means “the intentional absence of any object value” (a quote from the language specification).
        let foo;                // undefined
        function bar() {}       // undefined
        const baz = (x) => x;   // undefined


  // ========================
  // 14 Booleans
  // ========================
    
    // ## 14.1 Converting to boolean
    // ========================
    
      // These are three ways in which you can convert an arbitrary value x to a boolean.
      Boolean(x)
      // Most descriptive; recommended.
      x ? true : false
      // Uses the conditional operator (explained later in this chapter).
      !!x
      // Uses the logical Not operator (!). This operator coerces its operand to boolean. It is applied a second time to get a non-negated result.

      // Table 4: Converting values to booleans.
      x	                Boolean(x)
      undefined	        false
      null	            false
      boolean value	    x (no change)
      number value	    0 → false, NaN → false
                        other numbers → true
      string value	    '' → false
                        other strings → true
      object value	    always true

    // ## 14.3 Truthiness-based existence checks
    // ========================
      // For example, the following code checks if object obj has the property .prop:
        if (obj.prop !== undefined) {
          // obj has property .prop
        }

        // Due to undefined being falsy, we can shorten this check to:
        if (obj.prop) {
          // obj has property .prop
        }

        // The body of the if statement is skipped if:
          // * obj.prop is missing (in which case, JavaScript returns undefined).

        // However, it is also skipped if:
          // * obj.prop is undefined.
          // * obj.prop is any other falsy value (null, 0, '', etc.).

        // ### 14.5.3 Default values via logical Or (||)
          // The following code shows a real-world example:
          function countMatches(regex, str) {
            const matchResult = str.match(regex); // null or Array
            return (matchResult || []).length;
          }

          // Example: Default values via the Or operator (||)
            function getFilename(options) {
              if(options.filename) {
                return options.filename;
              } else {
                return 'Untitled';
              }
            }

            // Become like that
            function getFilename(options) {
              return options.filename || 'Untitled';
            }