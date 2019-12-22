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


  // ========================
  // 15 Numbers
  // ========================
    // Number literals
      const x = 0x10;
      assert.equal(x, 16)
      // The prefix 0x is for hexadecimal integers (base 16)

      const x = 0b10;
      assert.equal(x, 2)
      // The prefix 0b is for binary integers (base 2).

      const x = 4e2;
      assert.equal(x, 400)
      // Exponent: eN means ×10N

      // ### 15.2.2 Floating point literals
        // Accessing a property of an integer literal entails a pitfall: If the integer literal is immediately followed by a dot, then that dot is interpreted as a decimal dot:

        7.toString(); // syntax error
        
        // There are four ways to work around this pitfall:
        7.0.toString()
        (7).toString()
        7..toString()
        7 .toString()  // space before dot

    // ## 15.3 Arithmetic operators
    // ========================
      // Table 5: Binary arithmetic operators.
      // ...
      n % m	Remainder	ES1	             8 % 5 → 3
                                      -8 % 5 → -3
      n ** m	Exponentiation	ES2016	4 ** 2 → 16

        // ### 15.3.2 Unary plus (+) and negation (-)
          // Both operators coerce their operands to numbers:
          // Thus, unary plus lets us convert arbitrary values to numbers.
          +'5'
          5
          +'-12'
          -12
          -'9'
          -9

        // ### 15.3.3 Incrementing (++) and decrementing (--)
          // You can also apply these operators to property values:

          // To an object elements:
          const obj = { a: 1 };
          ++obj.a;
          assert.equal(obj.a, 2);
          
          // And to Array elements:
          const arr = [ 4 ];
          arr[0]++;
          assert.deepEqual(arr, [5]);

    // ## 15.4 Converting to number
    // ========================
      // These are three ways of converting values to numbers:
      Number(value)
      +value
      parseFloat(value) //(avoid; different than the other two!)
      
      // Recommendation: use the descriptive Number(). Tbl. 8 summarizes how it works.

      // Table 8: Converting values to numbers.
      x	          Number(x)
      undefined	  NaN
      null	      0
      boolean	    false → 0, true → 1
      number	    x (no change)
      string	    '' → 0
                  other → parsed number, ignoring leading/trailing whitespace
      object	    configurable (e.g. via .valueOf())

    // ## 15.6 Error value: NaN
    // ========================
      // NaN is an abbreviation of “not a number”. Ironically, JavaScript considers it to be a number:
      > typeof NaN
      'number'

      // When is NaN returned?
        // NaN is returned if a number can’t be parsed:
        > Number('$$$')
        NaN
        > Number(undefined)
        NaN
        
        // NaN is returned if an operation can’t be performed:
        > Math.log(-1)
        NaN
        > Math.sqrt(-1)
        NaN

        // NaN is returned if an operand or argument is NaN (to propagate errors):
        > NaN - 3
        NaN
        > 7 ** NaN
        NaN

      // ### 15.6.1 Checking for NaN
        // NaN is the only JavaScript value that is not strictly equal to itself:

        // These are several ways of checking if a value x is NaN:
        
        const x = NaN;
        
        assert.equal(Number.isNaN(x), true); // preferred
        assert.equal(Object.is(x, NaN), true);
        assert.equal(x !== x, true);

      // #### 15.6.2 Finding NaN in Arrays
        // Some Array methods can’t find NaN:
        > [NaN].indexOf(NaN)
        -1

        // Others can:
        > [NaN].includes(NaN)
        true
        > [NaN].findIndex(x => Number.isNaN(x))
        0
        > [NaN].find(x => Number.isNaN(x))
        NaN

    // ## 15.7 Error value: Infinity
    // ========================
      // Infinity is returned if a number is too large:

      > Math.pow(2, 1023)
      8.98846567431158e+307
      > Math.pow(2, 1024)
      Infinity

      // Infinity is returned if there is a division by zero:
      > 5 / 0
      Infinity
      > -5 / 0
      -Infinity

      // ### 15.7.1 Infinity as a default value
        // Infinity is larger than all other numbers (except NaN), making it a good default value:

        function findMinimum(numbers) {
          let min = Infinity;
          for (const n of numbers) {
            if (n < min) min = n;
          }
          return min;
        }
        assert.equal(findMinimum([5, -1, 2]), -1);
        assert.equal(findMinimum([]), Infinity);

        export function findMax(numbers) {
          let max = -Infinity;
          for (const n of numbers) {
              if (n > max) max = n
          }
          return max;
      }
      assert.equal(findMax([]), -Infinity);
      assert.equal(findMax([-20, -3, -15]), -3);
      assert.equal(findMax([100, 200, 5]), 200);

      // ### 15.7.2 Checking for Infinity
        // These are two common ways of checking if a value x is Infinity:

        const x = Infinity;

        assert.equal(x === Infinity, true);
        assert.equal(Number.isFinite(x), false);


  // ========================
  // 16 Math
  // ========================
    
    // ## 16.3 Rounding
    // =========================
    // Note how things change with negative numbers because “larger” always means “closer to positive infinity”.
    // Table 12: Rounding functions of Math. 
                -2.9	-2.5	-2.1	2.1	2.5	2.9
    Math.floor	-3	  -3	  -3	  2	  2	  2
    Math.ceil	  -2	  -2	  -2	  3	  3	  3
    Math.round	-3	  -2	  -2	  2	  3	  3
    Math.trunc	-2	  -2	  -2	  2	  2	  2

    // ## 16.5 Various other functions
    // =========================
      Math.abs(x: number): number [ES1]

      // Returns the absolute value of x.
      > Math.abs(3)
      3
      > Math.abs(-3)
      3
      > Math.abs(0)
      0

      Math.max(...values: number[]): number [ES1]
      // Converts values to numbers and returns the largest one.
      > Math.max(3, -5, 24)
      24
      
      Math.min(...values: number[]): number [ES1]
      // Converts values to numbers and returns the smallest one.
      > Math.min(3, -5, 24)
      -5
      
      Math.random(): number [ES1]
      // Returns a pseudo-random number n where 0 ≤ n < 1.

      // Computing a random integer i where 0 ≤ i < max:
      function getRandomInteger(max) {
        return Math.floor(Math.random() * max);
      }


  // ========================
  // 18 Strings
  // ========================
    
    // ## 18.2.2 Accessing Unicode code point characters via for-of and spreading
    // =========================
      // This is how you iterate over the code point characters of a string via for-of:

      for (const ch of 'x🙂y') {
        console.log(ch);
      }
      // Output:
      // 'x'
      // '🙂'
      // 'y'

      // And this is how you convert a string into an Array of code point characters via spreading:
      assert.deepEqual([...'x🙂y'], ['x', '🙂', 'y']);

    // ## 18.3 String concatenation via +
    // ==========================
      // The assignment operator += is useful if you want to assemble a string, piece by piece:

      let str = ''; // must be `let`!
      str += 'Say it';
      str += ' one more';
      str += ' time';

      assert.equal(str, 'Say it one more time');

    // ## 18.4 Converting to string
    // ===========================
      // These are three ways of converting a value x to a string:

      // Recommendation: use the descriptive and safe String().

      String(x)
      '' + x
      x.toString() // (does not work for undefined and null)

    // ## 18.5 Comparing strings
    // ============================
      // < <= > >=

      // There is one important caveat to consider: These operators compare based on the numeric values of JavaScript characters. That means that the order that JavaScript uses for strings is different from the one used in dictionaries and phone books:

      > 'A' < 'B' // ok
      true
      > 'a' < 'B' // not ok
      false
      > 'ä' < 'b' // not ok
      false

      // Properly comparing text it is supported via the ECMAScript Internationalization API (Intl).

    // ## 18.7 Quick reference: Strings
    // ============================
      // Strings are immutable; none of the string methods ever modify their strings.

      // Table 13: Converting values to strings.
        x	              String(x)
        undefined	      'undefined'
        null	          'null'
        Boolean value	  false → 'false', true → 'true'
        Number value	  123 → '123'
        String value	  x (input, unchanged)
        An object	      Configurable via, e.g., toString()

        // ### 18.7.2 Numeric values of characters
          // * Char code: represents a JavaScript character numerically. JavaScript’s name for Unicode code unit.
              // Size: 16 bits, unsigned
              // Convert number to character: String.fromCharCode() [ES1]
              // Convert character to number: string method .charCodeAt() [ES1]
          // * Code point: represents a Unicode character numerically.
              // Size: 21 bits, unsigned (17 planes, 16 bits each)
              // Convert number to character: String.fromCodePoint() [ES6]
              // Convert character to number: string method .codePointAt() [ES6]


        // ### 18.7.4 String.prototype: finding and matching
          .startsWith(searchString: string, startPos=0): boolean [ES6]
          .endsWith(searchString: string, endPos=this.length): boolean [ES6]
            > 'foo.txt'.endsWith('.txt')
            true
            > 'abcde'.endsWith('cd', 4)
            true

          .includes(searchString: string, startPos=0): boolean [ES6]
            > 'abc'.includes('b')
            true
            > 'abc'.includes('b', 2)
            false

          .indexOf(searchString: string, minIndex=0): number [ES1]
            > 'abab'.indexOf('a')
            0
            > 'abab'.indexOf('a', 1)
            2
            > 'abab'.indexOf('c')
            -1

          .lastIndexOf(searchString: string, maxIndex=Infinity): number [ES1]
            > 'abab'.lastIndexOf('ab', 2)
            2
            > 'abab'.lastIndexOf('ab', 1)
            0
            > 'abab'.lastIndexOf('ab')
            2

          [1 of 2] .match(regExp: string | RegExp): RegExpMatchArray | null [ES3]
            // If regExp is a regular expression with flag /g not set, then .match() returns the first match for regExp within the string. 
            // Or null if there is no match. 
            // If regExp is a string, it is used to create a regular expression (think parameter of new RegExp()) before performing the previously mentioned steps.

          [2 of 2] .match(regExp: RegExp): string[] | null [ES3]
            // If flag /g of regExp is set, .match() returns either an Array with all matches or null if there was no match.

          .search(regExp: string | RegExp): number [ES3]
            // Returns the index at which regExp occurs within the string. If regExp is a string, it is used to create a regular expression (think parameter of new RegExp()).

            > 'a2b'.search(/[0-9]/)
            1
            > 'a2b'.search('[0-9]')
            1

        // ### 18.7.5 String.prototype: extracting
          .slice(start=0, end=this.length): string [ES3]
            > 'abc'.slice(1, 3)
            'bc'
            > 'abc'.slice(1)
            'bc'
            > 'abc'.slice(-2)
            'bc'

          .split(separator: string | RegExp, limit?: number): string[] [ES3]
            // Splits the string into an Array of substrings – the strings that occur between the separators. The separator can be a string:

            > 'a | b | c'.split('|')
            [ 'a ', ' b ', ' c' ]

            // It can also be a regular expression:
            > 'a : b : c'.split(/ *: */)
            [ 'a', 'b', 'c' ]
            > 'a : b : c'.split(/( *):( *)/)
            [ 'a', ' ', ' ', 'b', ' ', ' ', 'c' ]

        // ### 18.7.6 String.prototype: combining
          .concat(...strings: string[]): string [ES3]
            // Returns the concatenation of the string and strings. 'a'.concat('b') is equivalent to 'a'+'b'. The latter is much more popular.

            > 'ab'.concat('cd', 'ef', 'gh')
            'abcdefgh

          .padStart(len: number, fillString=' '): string [ES2017]
          .padEnd(len: number, fillString=' '): string [ES2017]
            > '#'.padEnd(2)
            '# '
            > '#'.padEnd(5, 'abc')
            '#abca'

          .repeat(count=0): string [ES6]
            // Returns the string, concatenated count times.

            > '*'.repeat()
            ''
            > '*'.repeat(3)
            '***'

        // ### 18.7.7 String.prototype: transforming
          [1 of 2] .replace(searchValue: string | RegExp, replaceValue: string): string [ES3]
            > 'x.x.'.replace('.', '#')
            'x#x.'
            > 'x.x.'.replace(/./, '#')
            '#.x.'
            > 'x.x.'.replace(/./g, '#')
            '####'

          .toUpperCase(): string [ES1]
          .toLowerCase(): string [ES1]

          .trimEnd(): string [ES2019]
          .trimStart(): string [ES2019]
          .trim(): string [ES5]
            > '\r\n#\t  '.trim()
            '#'
            > '  abc  '.trim()
            'abc'


  // ============================
  // 19 Using template literals and tagged templates
  // ============================
    
    // ## 19.1 Disambiguation: “template”
    // =================================
      // * Text template is a function from data to text.
        <div class="entry">
          <h1>{{title}}</h1>
          <div class="body">
            {{body}}
          </div>
        </div>

      // * Template literal is similar to a string literal, but has additional features – for example, interpolation. It is delimited by backticks:
        const num = 5;
        assert.equal(`Count: ${num}!`, 'Count: 5!');

      // * Tagged template - Syntactically, a tagged template is a template literal that follows a function (or rather, an expression that evaluates to a function). That leads to the function being called. Its arguments are derived from the contents of the template literal.
        const getArgs = (...args) => args;
        assert.deepEqual(
          getArgs`Count: ${5}!`,
          [['Count: ', '!'], 5] );
        
        // Note that getArgs() receives both the text of the literal and the data interpolated via ${}.

    // ## 19.3 Tagged templates
    // =================================
      // The expression in line A is a tagged template. It is equivalent to invoking tagFunc() with the arguments listed in the Array in line B.
      
      function tagFunc(...args) {
        return args;
      }
      
      const setting = 'dark mode';
      const value = true;
      
      assert.deepEqual(
        tagFunc`Setting ${setting} is ${value}!`, // (A)
        [['Setting ', ' is ', '!'], 'dark mode', true] // (B)
      );

      // The function tagFunc before the first backtick is called a tag function. Its arguments are:
        // * Template strings (first argument): an Array with the text fragments surrounding the interpolations ${}.
            // In the example: ['Setting ', ' is ', '!']
        // * Substitutions (remaining arguments): the interpolated values.
            // In the example: 'dark mode' and true
        
        // The static (fixed) parts of the literal (the template strings) are kept separate from the dynamic parts (the substitutions).


    // ## 19.6 Multiline template literals and indentation
    // =================================
      // If you put multiline text in template literals, two goals are in conflict: On one hand, the template literal should be indented to fit inside the source code. On the other hand, the lines of its content should start in the leftmost column.
      function div(text) {
        return `
          <div>
            ${text}
          </div>
        `;
      }

      console.log(
        div('Hello!')
        // Replace spaces with mid-dots:
        .replace(/ /g, '·')
        // Replace \n with #\n:
        .replace(/\n/g, '#\n')
      );

      // "
      // ....<div>
      // ......Hello
      // ....</div>
      // .."

      // ### 19.6.2 Fix: .trim()
      function divDedented(text) {
        return `
          <div>
            ${text}
          </div>
        `.trim().replace(/\n/g, '#\n');
      }

    // ## 19.7 Simple templating via template literals
    // =================================
      // The solution is to use a template literal in the body of a function whose parameter receives the templating data – for example:
        const tmpl = (data) => `Hello ${data.name}!`;
        assert.equal(tmpl({name: 'Jane'}), 'Hello Jane!');

      // ### 19.7.1 A more complex example
      // As a more complex example, we’d like to take an Array of addresses and produce an HTML table. This is the Array:

      const addresses = [
        { first: '<Jane>', last: 'Bond' },
        { first: 'Lars', last: '<Croft>' },
      ];

      const tmpl = (addrs) => `
      <table>
        ${addrs.map(
          (addr) => `
            <tr>
              <td>${escapeHtml(addr.first)}</td>
              <td>${escapeHtml(addr.last)}</td>
            </tr>
            `.trim()
        ).join('')}
      </table>
      `.trim();

      // The first one (line 1) takes addrs, an Array with addresses, and returns a string with a table.
      // The second one (line 4) takes addr, an object containing an address, and returns a string with a table row. Note the .trim() at the end, which removes unnecessary whitespace.
      // The first templating function produces its result by wrapping a table element around an Array that it joins into a string (line 10). That Array is produced by mapping the second templating function to each element of addrs (line 3). It therefore contains strings with table rows.


  // ============================
  // 20 Symbols
  // ============================
    // Symbols are primitive values that are created via the factory function Symbol():
    
    // On one hand, symbols are like objects in that each value created by Symbol() is unique and not compared by value:
      Symbol() === Symbol()
      false
    
    // On the other hand, they also behave like primitive values. They have to be categorized via typeof:
      typeof Symbol() // 'symbol'

    // And they can be property keys in objects:
      const obj = {
        [sym]: 123,
      };

    // ## 20.1 Use cases for symbols
    // =========================
      // * Values for constants
      // * Unique property keys

      // ### 20.1.1 Symbols: values for constants
        const COLOR_BLUE = 'Blue';
        const MOOD_BLUE = 'Blue';

        COLOR_BLUE === MOOD_BLUE // true
        // Because two strings with the same content are considered equal:

        // We can fix that problem via symbols:
        const COLOR_BLUE = Symbol('Blue');
        const MOOD_BLUE = Symbol('Blue');

        assert.notEqual(COLOR_BLUE, MOOD_BLUE);


  // ================================
  // 21 Control flow statements
  // ================================
      
    // ## 21.2 Controlling loops: break and continue
    // ================================
      // ### 21.2.1 Break
        // There are two versions of break: one with an operand and one without an operand. The latter version works inside the following statements: while, do-while, for, for-of, for-await-of, for-in and switch. It immediately leaves the current statement:

        // break without a label can only be used inside loops.

        for (const x of ['a', 'b', 'c']) {
          console.log(x);
          if (x === 'b') break;
          console.log('---')
        }
        // Output:
        // 'a'
        // '---'
        // 'b'

      // ### 21.2.2 break plus label: leaving any labeled statement
        // break with an operand works everywhere. Its operand is a label. Labels can be put in front of any statement, including blocks. break foo leaves the statement whose label is foo:

        foo: { // label
          if (condition) break foo; // labeled break
          // ···
        }

        // Example: Find a suffix
        function findSuffix(stringArray, suffix) {
          let result;
          search_block: {
            for (const str of stringArray) {
              if (str.endsWith(suffix)) {
                // Success:
                result = str;
                break search_block; // (A)
              }
            } // for
            // Failure:
            result = '(Untitled)';
          } // search_block
        
          return { suffix, result };
            // Same as: {suffix: suffix, result: result}
        }

        assert.deepEqual(
          findSuffix(['foo.txt', 'bar.html'], '.html'),
          { suffix: '.html', result: 'bar.html' }
        );

      // ### 21.2.3 continue
        // continue only works inside while, do-while, for, for-of, for-await-of, and for-in. 
        // It immediately leaves the current loop iteration and continues with the next one – for example:
        // Iterate all items except the condition

        const lines = [
          'Normal line',
          '# Comment',
          'Another normal line',
        ];
        for (const line of lines) {
          if (line.startsWith('#')) continue;
          console.log(line);
        }

        // Output:
        // 'Normal line'
        // 'Another normal line'

    // ## 21.3 if statements
    // ===========================
      // So far, the then_statement has always been a block, but we can use any statement. That statement must be terminated with a semicolon:
      if (true) console.log('Yes'); else console.log('No');

      // Valid if statement
      // 4
      if (x === 0) foo(x);

      // 5
      if (x === 0) foo(x);
      else bar(x);

      // 6
      if (x === 0) foo(x);
      else if (x < 0) bar(x);

    // ## 21.4 switch statements
    // ===========================
      // ### 21.4.3 Empty case clauses
        // The statements of a case clause can be omitted, which effectively gives us multiple case expressions per case clause:
        function isWeekDay(name) {
          switch (name) {
            case 'Monday':
            case 'Tuesday':
            case 'Wednesday':
            case 'Thursday':
            case 'Friday':
              return true;
            case 'Saturday':
            case 'Sunday':
              return false;
            default:
                throw new Error('Illegal value: '+name);
            }
        }
        assert.equal(isWeekDay('Wednesday'), true);
        assert.equal(isWeekDay('Sunday'), false);

    // ## 21.8 for-of loops
    // =========================
      // ### 21.8.1 const: for-of vs. for
        // Note that in for-of loops you can use const. The iteration variable can still be different for each iteration (it just can’t change during the iteration). Think of it as a new const declaration being executed each time in a fresh scope.
        // In contrast, in for loops you must declare variables via let or var if their values change.

      // ### 21.8.2 Iterating over iterables
        // As mentioned before, for-of works with any iterable object, not just with Arrays – for example, with Sets:
        
        const set = new Set(['hello', 'world']);
        for (const elem of set) {
          console.log(elem);
        }

      // ### 21.8.3 Iterating over [index, element] pairs of Arrays
        // Lastly, you can also use for-of to iterate over the [index, element] entries of Arrays:

        const arr = ['a', 'b', 'c'];
        for (const [index, elem] of arr.entries()) {
          console.log(`${index} -> ${elem}`);
        }
        // Output:
        // '0 -> a'
        // '1 -> b'
        // '2 -> c'

        // With [index, element], we are using destructuring to access Array elements.

    // ## 21.10 for-in loops (avoid)
    // Recommendation: don’t use for-in loops
    // ========================
      function getOwnPropertyNames(obj) {
        const result = [];
        for (const key in obj) {
          if ({}.hasOwnProperty.call(obj, key)) { // (A)
            result.push(key);
          }
        }
        return result;
      }
      assert.deepEqual(
        getOwnPropertyNames({ a: 1, b:2 }),
        ['a', 'b']);

      // We can implement the same functionality without for-in, which is almost always better:
      function getOwnPropertyNames(obj) {
        const result = [];
        for (const key of Object.keys(obj)) {
          result.push(key);
        }
        return result;
      }


