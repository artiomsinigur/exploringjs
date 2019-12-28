  // ===========================
  // 23 Callable values
  // ===========================
    
    // ## 23.1 Kinds of functions
    // ==============================
      // JavaScript has two categories of functions:
        // * An ordinary function can play several roles:
          // - Real function
          // - Method
          // - Constructor function
        // * A specialized function can only play one of those roles – for example:
          // - An arrow function can only be a real function.
          // - A method can only be a method.
          // - A class can only be a constructor function.
        
    // ## 23.2 Ordinary functions
    // ==================================
      // The following code shows three ways of doing (roughly) the same thing: creating an ordinary function.

      // Function declaration (a statement)
      function ordinary1(a, b, c) {
        // ···
      }
      
      // const plus anonymous function expression
      const ordinary2 = function (a, b, c) {
        // ···
      };
      
      // const plus named function expression
      const ordinary3 = function myName(a, b, c) {
        // `myName` is only accessible in here
      };
      
      // ### 23.2.1 Parts of a function declaration
        function add(x, y) {
          return x + y;
        }

        // * add is the name of the function declaration.
        // * add(x, y) is the head of the function declaration.
        // * x and y are the parameters.
        // * The curly braces ({ and }) and everything between them are the body of the function declaration.
        // * The return statement explicitly returns a value from the function.

      // ### 23.2.2 Roles played by ordinary functions
        // As an ordinary function, add() can play three roles:

        // * Real function: invoked via a function call.
          assert.equal(add(2, 1), 3);
          
        // * Method: stored in property, invoked via a method call.
          const obj = { addAsMethod: add };
          assert.equal(obj.addAsMethod(2, 4), 6); // (A)
          // In line A, obj is called the receiver of the method call. It can be accessed via this inside the method.
        
        // * Constructor function/class: invoked via new.
          const inst = new add();
          assert.equal(inst instanceof add, true);

    // ## 23.3 Specialized functions
    // =============================
      // Table 15: Capabilities of four kinds of functions. “Lexical this” means that this is defined by the surroundings of an arrow function, not by method calls.
                            Function call	        Method call	    Constructor call
        Ordinary function	  (this === undefined)	✔	              ✔
        Arrow function	    ✔	                    (lexical this)	✘
        Method	            (this === undefined)	✔	              ✘
        Class	              ✘	                    ✘	              ✔

      // ### 23.3.3 Arrow functions
        // Let’s review the syntax of an anonymous function expression:
        const f = function (x, y, z) { return 123 };
        
        // Arrow functions are expressions.
        const f = (x, y, z) => { return 123 };
        const f = (x, y, z) => 123;
        const id = x => x;

        // That is convenient when passing arrow functions as parameters to other functions or methods:
        [1,2,3].map(x => x + 1)
        [ 2, 3, 4 ]

      // ### 23.3.3.2 Arrow functions: lexical this
        // Ordinary functions can be both methods and real functions. Alas, the two roles are in conflict:
          // * As each ordinary function can be a method, it has its own this.
          // * The own this makes it impossible to access the this of the surrounding scope from inside an ordinary function. And that is inconvenient for real functions.        
          
        // The following code demonstrates the issue:
          const person = {
            name: 'Jill',
            someMethod() {
              const ordinaryFunc = function () {
                assert.throws(
                  () => this.name, // (A)
                  /^TypeError: Cannot read property 'name' of undefined$/);
              };
              const arrowFunc = () => {
                assert.equal(this.name, 'Jill'); // (B)
              };
              
              ordinaryFunc();
              arrowFunc();
            },
          }

        // In this code, we can observe two ways of handling this:
          // * Dynamic this: In line A, we try to access the this of .someMethod() from an ordinary function. There, it is shadowed by the function’s own this, which is undefined (as filled in by the function call). Given that ordinary functions receive their this via (dynamic) function or method calls, their this is called dynamic.

          // * Lexical this: In line B, we again try to access the this of .someMethod(). This time, we succeed because the arrow function does not have its own this. this is resolved lexically, just like any other variable. That’s why the this of arrow functions is called lexical.
          
      // ### 23.3.3.3 Syntax pitfall: returning an object literal from an arrow function
        // If you want the expression body of an arrow function to be an object literal, you must put the literal in parentheses:

        const func1 = () => ({a: 1});
          assert.deepEqual(func1(), { a: 1 });
        // If you don’t, JavaScript thinks, the arrow function has a block body (that doesn’t return anything):
        
        const func2 = () => {a: 1};
          assert.deepEqual(func2(), undefined);
        // {a: 1} is interpreted as a block with the label a: and the expression statement 1. Without an explicit return statement, the block body returns undefined.
        
        // This pitfall is caused by syntactic ambiguity: object literals and code blocks have the same syntax. We use the parentheses to tell JavaScript that the body is an expression (an object literal) and not a statement (a block).

      // ## 23.6.2 Terminology: callback
        // A callback or callback function is a function that is an argument of a function or method call.

        // The following is an example of a callback:
          const myArray = ['a', 'b'];
          const callback = (x) => console.log(x);
          myArray.forEach(callback);
          
          // Output:
          // 'a'
          // 'b'

      // ### 23.6.3 Too many or not enough arguments
        // * Extra arguments are ignored.
        // * Missing parameters are set to undefined.

        // For example:
          function foo(x, y) {
            return [x, y];
          }
          
          // Too many arguments:
          assert.deepEqual(foo('a', 'b', 'c'), ['a', 'b']);
          
          // The expected number of arguments:
          assert.deepEqual(foo('a', 'b'), ['a', 'b']);
          
          // Not enough arguments:
          assert.deepEqual(foo('a'), ['a', undefined]);

      // ### 23.6.5 Rest parameters
        // A rest parameter is declared by prefixing an identifier with three dots (...). During a function or method call, it receives an Array with all remaining arguments. If there are no extra arguments at the end, it is an empty Array – for example:

        function func(x, ...y) {
          return [x, y];
        }
        assert.deepEqual(func(1,2,3), [1, [2,3]]);
        assert.deepEqual(func(), [undefined, []]);

        // #### 23.6.5.1 Enforcing a certain number of arguments via a rest parameter
          // You can use a rest parameter to enforce a certain number of arguments. Take, for example, the following function:
          function createPoint(x, y) {
            return {x, y};
              // same as {x: x, y: y}
          }

          // This is how we force callers to always provide two arguments:
          function createPoint(...args) {
            if (args.length !== 2) {
              throw new Error('Please provide exactly 2 arguments!');
            }
            // return an array
            return args;

            // or return an object
            const [x, y] = args; // (A)
            return {x, y};

            // or directly
            return {x: args[0], y: args[1]};
          }

      // ### 23.6.6 Named parameters
        // 1. Positional parameters: 
              // An argument is assigned to a parameter if they have the same position. A function call with only positional arguments looks as follows.
        selectEntries(3, 20, 2)

        // 2. Named parameters: 
              // An argument is assigned to a parameter if they have the same name. JavaScript doesn’t have named parameters, but you can simulate them. For example, this is a function call with only (simulated) named arguments:
        selectEntries({start: 3, end: 20, step: 2})

        // Named parameters have several benefits:
          // * They lead to more self-explanatory code because each argument has a descriptive label.
          // * The order of the arguments doesn’t matter (as long as the names are correct).
          // * Handling more than one optional parameter is more convenient: callers can easily provide any subset of all optional parameters and don’t have to be aware of the ones they omit (with positional parameters, you have to fill in preceding optional parameters, with undefined).

          // Example
          const func = ({start:x, end:y}) => ({start:x, end:y});
          test('Test', () => assert.deepEqual(func({start:1, end:2}), {start:1, end:2}));

        // ### 23.6.7 Simulating named parameters
          // JavaScript doesn’t have real named parameters. The official way of simulating them is via object literals:
            
          function selectEntries({start=0, end=-1, step=1}) {
            return {start, end, step};
          }
          // This function uses destructuring to access the properties of its single parameter. The pattern it uses is an abbreviation for the following pattern:
          {start: start=0, end: end=-1, step: step=1}

          // This destructuring pattern works for empty object literals:
          selectEntries({})
          { start: 0, end: -1, step: 1 }

          // But it does not work if you call the function without any parameters:
          selectEntries()
          TypeError: Cannot destructure property `start` of 'undefined' or 'null'.
          
          // You can fix this by providing a default value for the whole pattern (= {})
          function selectEntries({start=0, end=-1, step=1} = {}) {
            return {start, end, step};
          }
          selectEntries()
          { start: 0, end: -1, step: 1 }

        // ### 23.6.8 Spreading (Propager) (...) into function calls
          // If you put three dots (...) in front of the argument of a function call, then you spread it.
          // That means that the argument must be an iterable object and the iterated values all become arguments. In other words, a single argument is expanded into multiple arguments – for example:
            
          function func(x, y) {
              console.log(x);
              console.log(y);
            }
            const someIterable = ['a', 'b'];
            func(...someIterable);
              // same as func('a', 'b')
            
            // Output:
            // 'a'
            // 'b'

          // Spreading and rest parameters use the same syntax (...), but they serve opposite purposes:
            // * Rest parameters are used when defining functions or methods. They collect arguments into Arrays.
            // * Spread arguments are used when calling functions or methods. They turn iterable objects into arguments.
            Math.max(-1, 5, 11, 3)
            // 11
            Math.max(...[-1, 5, 11, 3])
            // 11