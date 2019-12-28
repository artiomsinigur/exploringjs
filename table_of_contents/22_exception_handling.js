  // ==================================
  // 22 Exception handling
  // ==================================

    // ## 22.1 Motivation: throwing and catching exceptions
    // =============================
      // Consider the following code. It reads profiles stored in files into an Array with instances of class Profile:

      function readProfiles(filePaths) {
        const profiles = [];
        for (const filePath of filePaths) {
          try {
            const profile = readOneProfile(filePath);
            profiles.push(profile);
          } catch (err) { // (A)
            console.log('Error in: '+filePath, err);
          }
        }
      }
      function readOneProfile(filePath) {
        const profile = new Profile();
        const file = openFile(filePath);
        // ··· (Read the data in `file` into `profile`)
        return profile;
      }
      function openFile(filePath) {
        if (!fs.existsSync(filePath)) {
          throw new Error('Could not find file '+filePath); // (B)
        }
        // ··· (Open the file whose path is `filePath`)
      }

      // * In line B, we use a throw statement to indicate that there was a problem.
      // * In line A, we use a try-catch statement to handle the problem.
      // When we throw, the following constructs are active:

      readProfiles(···)
        for (const filePath of filePaths)
          try
            readOneProfile(···)
              openFile(···)
                if (!fs.existsSync(filePath))
                  throw
      
      // One by one, throw exits the nested constructs, until it encounters a try statement. Execution continues in the catch clause of that try statement.

    // ## 22.2 throw
    // ==========================
      // This is the syntax of the throw statement:
      throw «value»;
        throw 'My Error'
        VM115:1 Uncaught My Error

      // Any value can be thrown, but it’s best to throw an instance of Error or its subclasses.
      throw new Error('Problem!');
        throw new Error('New Error!')
        VM143:1 Uncaught Error: New Error!
        at <anonymous>:1:7
    
      // ### 22.2.1 Options for creating error objects
        // Use class Error. That is less limiting in JavaScript than in a more static language because you can add your own properties to instances:

        const err = new Error('Could not find the file');
        err.filePath = filePath;
        throw err;

    // ## 22.2 The try statement
    // ==========================
      // The maximal version of the try statement looks as follows:
      try {
        «try_statements»
      } catch (error) {
        «catch_statements»
      } finally {
        «finally_statements»
      }

      // You can combine these clauses as follows:
      try-catch
      try-finally
      try-catch-finally

      // ### 22.3.1 The try block
        // The try block can be considered the body of the statement. This is where we execute the regular code.
      
      // ### 22.3.2 The catch clause
        // If an exception reaches the try block, then it is assigned to the parameter of the catch clause and the code in that clause is executed. Next, execution normally continues after the try statement. That may change if:

        // There is a return, break, or throw inside the catch block.
        // There is a finally clause (which is always executed before the try statement ends).

      // ### 22.3.3 The finally clause
        // The code inside the finally clause is always executed at the end of a try statement – no matter what happens in the try block or the catch clause.
        
        // Let’s look at a common use case for finally: You have created a resource and want to always destroy it when you are done with it, no matter what happens while working with it. You’d implement that as follows:

        const resource = createResource();
        try {
          // Work with `resource`. Errors may be thrown.
        } finally {
          resource.destroy();
        }

        // And even if there is a return statement (line A):
        let finallyWasExecuted = false;
        function func() {
          try {
            return; // (A)
          } finally {
            finallyWasExecuted = true;
          }
        }
        func();
        assert.equal(finallyWasExecuted, true);

    // ## 22.4 Error classes
    // ==============================
      // Error is the common superclass of all built-in error classes. It has the following subclasses:
        // * RangeError: Indicates a value that is not in the set or range of allowable values.
        // * ReferenceError: Indicate that an invalid reference value has been detected.
        // * SyntaxError: Indicates that a parsing error has occurred.
        // * TypeError: is used to indicate an unsuccessful operation when none of the other NativeError objects are an appropriate indication of the failure cause.
        // * URIError: Indicates that one of the global URI handling functions was used in a way that is incompatible with its definition.

        // ### 22.4.1 Properties of error objects

          // Consider err, an instance of Error:
          const err = new Error('Hello!');
          assert.equal(String(err), 'Error: Hello!');

          // Two properties of err are especially useful:
            // *.message: contains just the error message.
            assert.equal(err.message, 'Hello!');

            // * .stack: contains a stack trace. It is supported by all mainstream browsers.
            assert.equal(
            err.stack,
            `
            Error: Hello!
                at ch_exception-handling.mjs:1:13
            `.trim());