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