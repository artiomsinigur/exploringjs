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