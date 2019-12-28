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