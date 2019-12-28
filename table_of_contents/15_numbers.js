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
    n % m	Remainder	ES1	         8 % 5 → 3
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